import { useState } from "react";
import CountUp from "react-countup";
import Input from "./Input";

export default function App() {
  const [day, setDay] = useState({ value: "", error: "" });
  const [month, setMonth] = useState({ value: "", error: "" });
  const [year, setYear] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ years: "- -", months: "- -", days: "- -" });

  function handleSubmit(e) {
    e.preventDefault();
    let dayError = "";
    let monthError = "";
    let yearError = "";

    if (!day.value) dayError = "This field is required";
    if (!month.value) monthError = "This field is required";
    if (!year.value) yearError = "This field is required";

    if (day.value < 1 || day.value > 31) dayError = "Must be a valid day";
    if (month.value < 1 || month.value > 12)
      monthError = "Must be a valid month";
    if (year.value > new Date().getFullYear())
      yearError = "Must be a valid year";

    if ((dayError, monthError, yearError)) {
      setDay((prev) => ({ ...prev, error: dayError }));
      setMonth((prev) => ({ ...prev, error: monthError }));
      setYear((prev) => ({ ...prev, error: yearError }));
      setAge({ years: "- -", months: "- -", days: "- -" });
      return;
    }

    const date = new Date(year.value, month.value - 1, day.value);
    if (Number(month.value) !== date.getMonth() + 1) {
      setDay((prev) => ({ ...prev, error: "Must be a valid date" }));
      setMonth((prev) => ({ ...prev, error: " " }));
      setYear((prev) => ({ ...prev, error: " " }));
      setAge({ years: "- -", months: "- -", days: "- -" });
      return;
    }

    setDay((prev) => ({ ...prev, error: "" }));
    setMonth((prev) => ({ ...prev, error: "" }));
    setYear((prev) => ({ ...prev, error: "" }));

    let diff = new Date() - date;
    const ageYears = Math.floor(diff / 31556952000);
    diff = diff % 31556952000;
    const ageMonths = Math.floor(diff / 2629746000);
    diff = diff % 2629746000;
    const ageDays = Math.floor(diff / 86400000);

    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    });

    console.log(diff);
  }

  return (
    <main>
      <h1 className="sr-only">Age Calculator challenge on Frontend Mentor</h1>
      <section className="card">
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-row">
            <Input
              label="day"
              placeholder="DD"
              min={1}
              max={31}
              value={day}
              onChange={setDay}
            />
            <Input
              label="month"
              placeholder="MM"
              min={1}
              max={12}
              value={month}
              onChange={setMonth}
            />
            <Input
              label="year"
              placeholder="YYYY"
              min=""
              max={new Date().getFullYear()}
              value={year}
              onChange={setYear}
            />
          </div>
          <button className="button" type="submit">
            Calculate
          </button>
        </form>
        <p className="result">
          <span className="result-row">
            {age.years === "- -" ? (
              <span className="number">{age.years}</span>
            ) : (
              <CountUp className="number" end={age.years} />
            )}{" "}
            years
          </span>
          <span className="result-row">
            {age.months === "- -" ? (
              <span className="number">{age.months}</span>
            ) : (
              <CountUp className="number" end={age.months} />
            )}{" "}
            months
          </span>
          <span className="result-row">
            {age.days === "- -" ? (
              <span className="number">{age.days}</span>
            ) : (
              <CountUp className="number" end={age.days} />
            )}{" "}
            days
          </span>
        </p>
      </section>
    </main>
  );
}
