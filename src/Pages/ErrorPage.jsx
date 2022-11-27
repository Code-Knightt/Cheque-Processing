import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div>Not found</div>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default ErrorPage;
