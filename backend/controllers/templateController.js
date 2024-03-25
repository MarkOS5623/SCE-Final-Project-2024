const Template = require('../models/template');
const User = require('../models/user');

const templateController = {
    // save template to the database if a template with the same name already exists it will overide it
    saveTemplate: async (req, res) => {
      try {
        const { Data, title } = req.body;
        const user = await User.findOne({ email: 'markos093@gmail.com' });
        const Tem = await Template.findOne({title: title});
        if(Tem){
          await Tem.updateOne({ text: Data });
          res.status(200).send('Template updated successfully');
        } else {
          const newDocument = new Template({
            title: title,
            text: Data,
            department: "test",
            author: user,
          });
          await newDocument.save();
          res.status(200).send('Template saved successfully');
        }
      } catch (error) {
        console.error('Error saving template:', error);
        res.status(500).send('Internal server error');
      }
    },
    // fetches a template from the database and returns it as json object
    fetchTemplate: async (req, res) => {
      try {
        const { title } = req.body; 
        console.log(req.body);
        const template = await Template.findOne({ title: title }); 
        if (!template) {
          return res.status(404).send('Template not found');
        }
        res.status(200).json(template);
      } catch (error) {
        console.error('Error fetching template serverside:', error);
        res.status(500).send('Internal server error');
      }
    },
    // returns an array of strings containing the titles of all the documents in the database
    fetchTemplatesList: async (req, res) => { 
      try {
        const templatesList = await Template.find({});
        if (!templatesList) {
          return res.status(404).send('Templates not found');
        }
        const documentTitles = templatesList.map(Tem => Tem.title);
        res.status(201).json({docs: documentTitles});
      } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send('Internal server error');
      }
    }    
  };
  
  module.exports = templateController;