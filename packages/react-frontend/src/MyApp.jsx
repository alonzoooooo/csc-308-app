import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  function removeOneCharacter(id) {
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 204) {
        setCharacters((currentCharacters) =>
          currentCharacters.filter((character) => character.id !== id)
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
    return fetch("Http://localhost:8000/users", {
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
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
    fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {console.log(error); });
  }, []);


  
}

export default MyApp;