const Form = require('../models/form');
const User = require('../models/user');
const { handleServerError } = require('../utils'); 

const formController = {
    // Save template to the database. If a template with the same name already exists, it will override it.
    saveForm: async (req, res) => {
        try {
            const { Data, title, Signatories, Author, Type } = req.body;
            const signatories = await User.find({ _id: { $in: Signatories } });
            const user = await User.findOne({ id: Author });
            const existingForm = await Form.findOne({ title });

            if (existingForm) {
                await existingForm.updateOne({ text: Data, signatories });
                res.status(200).send('Form updated successfully');
            } else {
                const newForm = new Form({
                    title,
                    text: Data,
                    department: "test",
                    type: Type,
                    author: user,
                    signatories
                });
                await newForm.save();
                res.status(200).send('Form saved successfully');
            }
        } catch (error) {
            handleServerError(res, error, 'Error saving form');
        }
    },

    // Fetch a template from the database and return it as a JSON object.
    fetchForm: async (req, res) => {
        try {
            const { title } = req.body;
            const form = await Form.findOne({ title });

            if (!form) {
                return res.status(404).send('Form not found');
            }

            res.status(200).json(form);
        } catch (error) {
            handleServerError(res, error, 'Error fetching form');
        }
    },

    // Returns an array of strings containing the titles of all the templates in the database that don't need to be signed.
    fetchNoSignatureFormsList: async (req, res) => {
        try {
            const formsList = await Form.find({
                signatories: { $size: 0 },
                type: { $ne: "Return" }
            });

            if (!formsList.length) {
                return res.status(404).send('Forms not found');
            }

            const formTitles = formsList.map(form => form.title);
            res.status(201).json({ docs: formTitles });
        } catch (error) {
            handleServerError(res, error, 'Error fetching forms');
        }
    },

    // Returns an array of strings containing the titles of all templates in the database that require signatures.
    fetchFormWithSignatureList: async (req, res) => {
        try {
            const formsList = await Form.find({ signatories: { $exists: true, $ne: [] } });

            if (!formsList.length) {
                return res.status(404).send('Forms not found');
            }

            const formTitles = formsList.map(form => form.title);
            res.status(201).json({ docs: formTitles });
        } catch (error) {
            handleServerError(res, error, 'Error fetching forms');
        }
    },

    // Returns an array of strings containing the titles of all templates in the database.
    fetchAllFormsList: async (req, res) => {
        try {
            const formsList = await Form.find({});

            if (!formsList.length) {
                return res.status(404).send('Forms not found');
            }

            const formTitles = formsList.map(form => form.title);
            res.status(201).json({ docs: formTitles });
        } catch (error) {
            handleServerError(res, error, 'Error fetching forms');
        }
    },

    // Delete a form by its title.
    deleteForm: async (req, res) => {
        try {
            const { title } = req.body;
            await Form.deleteOne({ title });
            res.status(200).json('Form deleted successfully');
        } catch (error) {
            handleServerError(res, error, 'Error deleting form');
        }
    },

    // Update the title of a form.
    updateFormTitle: async (req, res) => {
        try {
            const { oldTitle, newTitle } = req.body;
            const form = await Form.findOne({ title: oldTitle });

            if (!form) {
                return res.status(404).send('Form not found');
            }

            await form.updateOne({ title: newTitle });
            res.status(200).send('Form title updated successfully');
        } catch (error) {
            handleServerError(res, error, 'Error updating form title');
        }
    },
};

module.exports = formController;
