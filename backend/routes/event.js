const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create a new event
router.post('/events', async (req, res) => {
 const {title, description, date, userId} = req.body;

 try {
  const event = await Event.create({title, description, date, userId});
  res.status(201).json(event);
 } catch (error) {
  console.log(error);
  res.status(500).json({error: 'Error creating event'});
 }
});

// Get all events for a user
router.get('/events/:userId', async (req, res) => {
 const {userId} = req.params;

 try {
  const events = await Event.findAll({where: {userId}});
  res.status(200).json(events);
 } catch (error) {
  console.log(error);

  res.status(500).json({error: 'Error fetching events'});
 }
});

// Update an event
router.put('/events/:id', async (req, res) => {
 const {id} = req.params;
 const {title, description, date} = req.body;

 try {
  const event = await Event.findByPk(id);
  if (!event) {
   return res.status(404).json({error: 'Event not found'});
  }

  event.title = title;
  event.date = date;
  event.description = description;
  await event.save();

  res.status(200).json(event);
 } catch (error) {
  console.log(error);

  res.status(500).json({error: 'Error updating event'});
 }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
 const {id} = req.params;

 try {
  const event = await Event.findByPk(id);
  if (!event) {
   return res.status(404).json({error: 'Event not found'});
  }

  await event.destroy();
  res.status(200).json({message: 'Event deleted'});
 } catch (error) {
  console.log(error);

  res.status(500).json({error: 'Error deleting event'});
 }
});

module.exports = router;
