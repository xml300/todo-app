import { useRef } from "react";
import { addTodo } from "../helper";

export default function NewTaskModal({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);

  function submitHandler() {
    if (titleRef.current && descRef.current) {
      const title = titleRef.current.value;
      const desc = descRef.current.value;
      const data = { title, desc, isComplete: false };

      addTodo(data);
      setModal(false);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button type='button' className='close-button' onClick={() => setModal(false)}>X</button>
        <h2>Create New Todo</h2>

        <div className="modal-row">
          <label htmlFor="title">Title</label>
          <input ref={titleRef} type="text" name="title" id="title" />
        </div>

        <div className="modal-row">
          <label htmlFor="desc">Description</label>
          <textarea ref={descRef} name="desc" id="desc" cols={30} rows={10}></textarea>
        </div>

        <div className="modal-row center-hor">
          <button className='cancel' onClick={() => setModal(false)}>Cancel</button>
          <button className='affirm' onClick={submitHandler}>OK</button>
        </div>
      </div>
    </div>
  );
}
