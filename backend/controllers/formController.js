const Form = require('../models/form');
const User = require('../models/user');

const formController = {
    // save template to the database if a template with the same name already exists it will overide it
    saveForm: async (req, res) => {
      try {
        const { Data, title, Signatories, Author, Type } = req.body;
        const signatories = await User.find({ id: {  $in: Signatories } });
        const user = await User.findOne({ id: Author });
        const Tem = await Form.findOne({title: title});
        if(Tem){
          await Tem.updateOne({ text: Data });
          await Tem.updateOne({ signatories: signatories });
          res.status(200).send('Form updated successfully');
        } else {
          const newForm = new Form({
            title: title,
            text: Data,
            department: "test",
            type: Type,
            author: user,
            signatories: signatories
          });
          await newForm.save();
          res.status(200).send('Form saved successfully');
        }
      } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).send('Internal server error');
      }
    },
    // fetches a template from the database and returns it as json object
    fetchForm: async (req, res) => {
      try {
        const { title } = req.body; 
        const form = await Form.findOne({ title: title }); 
        if (!form) {
          return res.status(404).send('Form not found');
        }
        res.status(200).json(form);
      } catch (error) {
        console.error('Error fetching form from serverside:', error);
        res.status(500).send('Internal server error');
      }
    },
    // returns an array of strings containing the titles of all the templates in the database that don't need to be signed
    fetchUnsignedFormsList: async (req, res) => { 
      try {
        const formsList = await Form.find({ signatories: { $size: 0 } });
        if (!formsList) {
          return res.status(404).send('Forms not found');
        }
        const formTitles = formsList.map(Tem => Tem.title);
        res.status(201).json({docs: formTitles});
      } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).send('Internal server error');
      }
    },
    fetchOnlySignedFormsList: async (req, res) => { 
      try {
        const formsList = await Form.find({ signatories: { $exists: true, $ne: [] } });
        if (!formsList) {
          return res.status(404).send('Forms not found');
        }
        const formTitles = formsList.map(Tem => Tem.title);
        res.status(201).json({docs: formTitles});
      } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).send('Internal server error');
      }
    },
    fetchAllFormsList: async (req, res) => { 
      try {
        const formsList = await Form.find({});
        if (!formsList) {
          return res.status(404).send('Forms not found');
        }
        const formTitles = formsList.map(Tem => Tem.title);
        res.status(201).json({docs: formTitles});
      } catch (error) {
        console.error('Error fetching form:', error);
        res.status(500).send('Internal server error');
      }
    },
    deleteForm: async (req, res) => {
      try {
        const { title } = req.body; 
        const form = await Form.deleteOne({ title: title }); 
        res.status(200).json('deleted successfully');
      } catch (error) {
        console.error('Error fetching form serverside:', error);
        res.status(500).send('Internal server error');
      }
    },
  };
  
  module.exports = formController;