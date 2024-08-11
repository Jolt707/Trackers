/*
Name: Jensen Stamp
Description: This is a file which modifies the database by adding the "accountType" column to "Users", called a migration
Date: 11/8/24
*/
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Users", "accountType", {
      type: Sequelize.ENUM("USER", "TEACHER", "PARENT"),
      defaultValue: "USER",
      allowNull: false,
    })
    await queryInterface.removeColumn("Users", "admin")
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
