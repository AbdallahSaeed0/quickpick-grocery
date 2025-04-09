import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Category {id}</h1>
      <p>This is the page for category {id}.</p>
    </div>
  );
}

export default CategoryPage;