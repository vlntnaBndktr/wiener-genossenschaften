import { Project } from '../models/projects.js';

const createProject = async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
    });

    res.send(newProject);
  } catch (error) {
    res.error(500);
  }
};

export { createProject };
