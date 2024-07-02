import React from 'react';
import './Blogs.css';
import { Button, Container, Modal } from "react-bootstrap";
import { useState } from "react";

const Blogs = () => {
  return (
    <section className="blogs-section">
      <h2>Blogs</h2>
      <p>Check out my latest blog posts</p>
      <a 
        href="https://medium.com/@ashrafali31018" 
        target="_blank" 
        rel="noopener noreferrer"
        className="blog-link"
      >
        Visit My Blog
      </a>
    </section>
  );
};

export default Blogs;
