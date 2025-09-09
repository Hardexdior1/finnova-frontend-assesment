import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br py-4 from-primary/10 via-background to-accent/5 border-b border-border">
      <div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Product CRUD Application
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A simple application where you can create, view, edit, and delete products with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
