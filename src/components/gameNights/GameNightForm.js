import React from "react"
import PropTypes from "prop-types"
import TextInput from "../common/TextInput"

const GameNightForm = ({
   gameNight,
   onSave,
   onChange,
   saving = false,
   errors = {}
 }) => {
   return (
     <form onSubmit={onSave}>
       <h2>{gameNight.id ? "Edit" : "Add"} Game Night</h2>
       {errors.onSave && (
         <div className="alert alert-danger" role="alert">
           {errors.onSave}
         </div>
       )}
       <TextInput
         name="date"
         label="Date"
         value={gameNight.date}
         onChange={onChange}
         error={errors.date}
       />

       <button type="submit" disabled={saving} className="btn btn-primary">
         {saving ? "Saving..." : "Save"}
       </button>
     </form>
   );
 };

 GameNightForm.propTypes = {
   gameNight: PropTypes.object.isRequired,
   errors: PropTypes.object,
   onSave: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   saving: PropTypes.bool
 };

export default GameNightForm