const {sequelize} = require("../db/mysql/dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const {keysTo, renameProperty} = require('../helpers/utils');
const Op = require('sequelize').Op;
const {Bug} = require('../models/bug');
const {DataTypes} = require("sequelize");
const userService = require('../services/user-service');

/**
 * Returns a list of every bug in the database
 * @returns {Promise<Bug[]>} list of Bugs
 */
const findAll = async () => {
    return sequelize.transaction(async (_transaction) => {
       let bugs = await models.bugs.findAll({
           include: [{
               model: models.attachments, as: 'bug_attachments'
           }]
       });

       // convert properties so it matches front-end
       for (let it of bugs) {
           it.dataValues= keysTo(it.dataValues, 'camel');
           renameProperty(it.dataValues, 'createdByUserId', 'createdByUserName');
           renameProperty(it.dataValues, 'assignedToUserId', 'assignedToUserName');
           renameProperty(it.dataValues, 'id', 'bugId');
           renameProperty(it.dataValues, 'bugAttachments', 'attachments');
           it.dataValues.createdByUserName =
               (await userService.findById(it.dataValues.createdByUserName)).user_name;
           if (it.dataValues.assignedToUserName)
               it.dataValues.assignedToUserName =
                   (await userService.findById(it.dataValues.assignedToUserName)).user_name;
       }

       return bugs;
    });
}

/**
 * Updated a bug
 * @param bug{Bug} Bug model
 */
const update = async (bug) => {

    // keys to snake case and convert fields to match database
    bug = keysTo(bug, 'snake');
    renameProperty(bug, 'assigned_to_user_name', 'assigned_to_user_id');
    renameProperty(bug, 'created_by_user_name', 'created_by_user_id');
    renameProperty(bug, 'bug_id', 'id');
    // noinspection JSUndefinedPropertyAssignment
    bug.created_by_user_id = (await userService.findByUsername(bug.created_by_user_id)).id;
    if(bug.assigned_to_user_id) {
        // noinspection JSUndefinedPropertyAssignment
        bug.assigned_to_user_id = (await userService.findByUsername(bug.assigned_to_user_id)).id;
    }

    console.log(bug);

    await sequelize.transaction((_transaction) => {

        // update the bug
        models.bugs.update({
            title: bug.title,
            description: bug.description,
            fixed_in_version: bug.fixed_in_version,
            severity: bug.severity,
            status: bug.status,
            version: bug.version,
            assigned_to_user_id: bug.assigned_to_user_id
        }, {
            where: { id: bug.id }
        })
    });
}

module.exports = {
    findAll, update
}