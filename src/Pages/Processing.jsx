import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

function Processing() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    navigate("/submitted");
  };

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        payee: "John Doe",
        amountNumber: 12560,
        amountWords: "Twelve thousand five hundred and sixty only",
        accountNumber: 5252526457,
        chequeNumber: 950020,
      });
      setIsLoading(false);
    }, 1500);
  }, [formData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Details>
          <h1>Verify your details</h1>
          <form onSubmit={submitForm}>
            <label>Name </label>
            <input type="text" defaultValue={formData.payee} disabled />
            <label>Amount </label>
            <input
              type="number"
              defaultValue={formData.amountNumber}
              disabled
            />
            <label>Amount(words) </label>
            <input type="text" defaultValue={formData.amountWords} disabled />
            <label>Account number </label>
            <input
              type="number"
              defaultValue={formData.accountNumber}
              disabled
            />
            <label>Cheque number </label>
            <input
              type="number"
              defaultValue={formData.chequeNumber}
              disabled
            />
            <div className="buttons">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Edit
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </Details>
      )}
    </>
  );
}

const Details = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 6rem;
    text-transform: uppercase;
  }

  form {
    label {
      display: inline;
      font-size: 2rem;
      font-weight: 600;
    }

    input {
      display: block;
      margin-bottom: 1rem;
      height: 5rem;
      min-width: 50rem;
      font-size: 2rem;
      padding: 0.5rem 1rem;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      padding: 0 5rem;
    }

    button {
      padding: 1rem 2rem;
      font-weight: 600;
      border-radius: 1rem;
      cursor: pointer;
    }
  }
`;

export default Processing;
