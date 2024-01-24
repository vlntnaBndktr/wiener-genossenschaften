import React from 'react';
import useStore from '../stores/useStore';
import { useEffect } from 'react';

const ProjectsComponent = () => {
  const { projects, loading, error, getAllProjects } = useStore();

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return <p>Lade...</p>;
  }

  if (error) {
    return <p>Fehler beim Laden der Projekte: {error.message}</p>;
  }

  return (
    <div>
      <h1>Projekte</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsComponent;
