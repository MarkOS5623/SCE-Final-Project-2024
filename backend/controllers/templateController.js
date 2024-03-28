const Template = require('../models/template');
const User = require('../models/user');

const templateController = {
    // save template to the database if a template with the same name already exists it will overide it
    saveTemplate: async (req, res) => {
      try {
        const { Data, title, Signatories, Author } = req.body;
        console.log(Signatories)
        const signatories = await User.find({ id: {  $in: Signatories } });
        const user = await User.findOne({ id: Author });
        const Tem = await Template.findOne({title: title});
        if(Tem){
          await Tem.updateOne({ text: Data });
          await Tem.updateOne({ signatories: signatories });
          res.status(200).send('Template updated successfully');
        } else {
          const newDocument = new Template({
            title: title,
            text: Data,
            department: "test",
            author: user,
            signatories: signatories
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
    // returns an array of strings containing the titles of all the templates in the database that don't need to be signed
    fetchNoSignTemplatesList: async (req, res) => { 
      try {
        const templatesList = await Template.find({ signatories: { $size: 0 } });
        if (!templatesList) {
          return res.status(404).send('Templates not found');
        }
        const templatTitles = templatesList.map(Tem => Tem.title);
        res.status(201).json({docs: templatTitles});
      } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).send('Internal server error');
      }
    },
    fetchOnlySignTemplatesList: async (req, res) => { 
      try {
        const templatesList = await Template.find({ signatories: { $exists: true, $ne: [] } });
        if (!templatesList) {
          return res.status(404).send('Templates not found');
        }
        const templatTitles = templatesList.map(Tem => Tem.title);
        res.status(201).json({docs: templatTitles});
      } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).send('Internal server error');
      }
    },
    fetchTemplatesList: async (req, res) => { 
      try {
        const templatesList = await Template.find({});
        if (!templatesList) {
          return res.status(404).send('Templates not found');
        }
        const templatTitles = templatesList.map(Tem => Tem.title);
        res.status(201).json({docs: templatTitles});
      } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).send('Internal server error');
      }
    }  
  };
  
  module.exports = templateController;