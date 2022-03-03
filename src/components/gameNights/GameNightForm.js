import React from "react"
import PropTypes from "prop-types"
import DateInput from "../common/DateInput"
import CheckboxInput from "../common/CheckboxInput";

const GameNightForm = ({
  gameNight,
  onSave,
  onDateChange,
  onOptionListChange,
  saving = false,
  errors = {}
}) => {
  const possibleOptions = ['Super Mario Party','Mario Kart 8 Deluxe','Overcooked','Gang Beasts','Jenga','Ping Pong','Super Smash','Jackbox Party Pack','Uno!','Monopoly Deal','Brawlhalla','Pico Park','Dungeons and Dragons','Marble','Risk: Global Domination','Survivor Pong','Ring The Bells']
  return (
    <form onSubmit={onSave}>
      <h2>{gameNight.id ? "Edit" : "Add"} Game Night</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <DateInput
        name="date"
        label="Date"
        value={gameNight.date}
        onChange={onDateChange}
        error={errors.date}
      />
      <CheckboxInput
        name="options"
        label="Options"
        options={possibleOptions}
        values={gameNight.options}
        onChange={onOptionListChange}
        error={errors.options}
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
  onDateChange: PropTypes.func.isRequired,
  onOptionListChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default GameNightForm