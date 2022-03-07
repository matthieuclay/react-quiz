import React from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  return (
    <div id="flashcard-list">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}

export default FlashcardList;
