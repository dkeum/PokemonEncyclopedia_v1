import { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ pokemonId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    try {
      const res = await axios.post(`/api/PokemonEncyclopedia_v1/pokemonencyclopedia/${pokemonId}/comments`, {
        postedBy: name,
        text: commentText,
      });

      // Call the onCommentAdded function to update the parent component's state
      onCommentAdded(res.data);

      setName('');
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <div className="row gap-3">
        <div className="col-12 col-md-6">
          <label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="col-12 col-md-6">
          <label>
            <textarea
              className="form-control"
              value={commentText}
              placeholder="Enter your comment here"
              onChange={(e) => setCommentText(e.target.value)}
              rows="4"
              cols="50"
            />
          </label>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default AddCommentForm;
