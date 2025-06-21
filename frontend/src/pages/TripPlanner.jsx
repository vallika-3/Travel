

import React, { useState } from 'react';
import './TripPlanner.css';
import { FaEdit, FaTrash, FaPlus, FaDownload, FaSave } from 'react-icons/fa';
import jsPDF from 'jspdf';

const TripPlanner = () => {
  const [plan, setPlan] = useState([
    {
      day: 'Day 1',
      activities: ['Arrival at Bali Airport', 'Check-in at hotel', 'Beach Sunset Dinner'],
    },
    {
      day: 'Day 2',
      activities: ['Visit Ubud Monkey Forest', 'Tegallalang Rice Terrace', 'Traditional Dance Show'],
    },
  ]);

  const handleAddActivity = (index) => {
    const newActivity = prompt('Enter activity:');
    if (newActivity) {
      const updatedPlan = [...plan];
      updatedPlan[index].activities.push(newActivity);
      setPlan(updatedPlan);
    }
  };

  const handleEditActivity = (dayIndex, activityIndex) => {
    const updated = prompt('Update activity:', plan[dayIndex].activities[activityIndex]);
    if (updated) {
      const updatedPlan = [...plan];
      updatedPlan[dayIndex].activities[activityIndex] = updated;
      setPlan(updatedPlan);
    }
  };

  const handleDeleteActivity = (dayIndex, activityIndex) => {
    const updatedPlan = [...plan];
    updatedPlan[dayIndex].activities.splice(activityIndex, 1);
    setPlan(updatedPlan);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Trip Plan', 20, 20);
    let y = 30;

    plan.forEach((day) => {
      doc.setFontSize(14);
      doc.text(day.day, 20, y);
      y += 10;

      day.activities.forEach((activity) => {
        doc.setFontSize(12);
        doc.text(`- ${activity}`, 30, y);
        y += 8;
      });

      y += 5;
    });

    doc.save('trip-plan.pdf');
  };

  return (
    <div className="trip-planner-container">
      <h1 className="trip-title"> Plan Your Trip</h1>

      <div className="plan-timeline">
        {plan.map((day, dayIndex) => (
          <div className="day-card" key={dayIndex}>
            <h2>{day.day}</h2>
            <ul>
              {day.activities.map((activity, index) => (
                <li key={index}>
                  {activity}
                  <span className="action-icons">
                    <FaEdit onClick={() => handleEditActivity(dayIndex, index)} />
                    <FaTrash onClick={() => handleDeleteActivity(dayIndex, index)} />
                  </span>
                </li>
              ))}
            </ul>
            <button className="add-btn" onClick={() => handleAddActivity(dayIndex)}>
              <FaPlus /> Add Activity
            </button>
          </div>
        ))}
      </div>

      <div className="planner-actions">
        <button className="save-btn"><FaSave /> Save Plan</button>
        <button className="export-btn" onClick={exportPDF}><FaDownload /> Export PDF</button>
      </div>
    </div>
  );
};

export default TripPlanner;
