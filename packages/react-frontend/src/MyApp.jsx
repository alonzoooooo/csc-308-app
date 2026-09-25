import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  // Loads the users from MongoDB when the page first opens.
  useEffect(() => {
    fetchUsers()
      .then((response) => response.json())
      .then((json) => {
        setCharacters(json.users_list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // MongoDB uses _id, so compare character._id to the deleted ID.
          setCharacters((currentCharacters) =>
            currentCharacters.filter((character) => character._id !== id)
          );
        } else if (response.status === 404) {
          throw new Error("User was not found.");
        } else {
          throw new Error(`DELETE failed with status ${response.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error(`POST failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((newPerson) => {
        setCharacters((currentCharacters) => [
          ...currentCharacters,
          newPerson,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />

      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;