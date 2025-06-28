import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [form, setForm] = useState({
    name: 'Vallika Sai Sree',
    email: 'vallika@email.com',
    phone: '9876543210',
    dob: '',
    region: 'India',
    password: '',
    confirmPassword: '',
    darkMode: false,
    notifications: true,
    twoFA: false,
    profileImage: '',
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setForm((prev) => ({ ...prev, darkMode: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === 'file') {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setForm((prev) => ({ ...prev, profileImage: fileReader.result }));
      };
      fileReader.readAsDataURL(files[0]);
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
      if (name === 'darkMode') {
        document.body.classList.toggle('dark', checked);
        localStorage.setItem('theme', checked ? 'dark' : 'light');
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(form));
    alert('✅ Settings saved!');
  };

  return (
    <div className="settings-wrapper">
      <h1 className="settings-title">⚙️ Account Settings</h1>

      <form className="settings-form glass" onSubmit={handleSubmit}>
        {/* Left Column */}
        <div className="form-section">
          <label className="image-upload">
            Profile Picture
            <input type="file" accept="image/*" onChange={handleChange} />
            {form.profileImage && (
              <img src={form.profileImage} alt="Preview" className="preview-img" />
            )}
          </label>

          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Date of Birth
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Right Column */}
        <div className="form-section">
          <label>
            Region
            <select name="region" value={form.region} onChange={handleChange}>
              <option>India</option>
              <option>United States</option>
              <option>Europe</option>
              <option>Australia</option>
            </select>
          </label>

          <label>
            New Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <div className="toggles">
            <label className="switch-label">
              <input
                type="checkbox"
                name="darkMode"
                checked={form.darkMode}
                onChange={handleChange}
              />
              <span className="switch-custom"></span>
              Enable Dark Mode
            </label>

            <label className="switch-label">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
              />
              <span className="switch-custom"></span>
              Enable Notifications
            </label>

            <label className="switch-label">
              <input
                type="checkbox"
                name="twoFA"
                checked={form.twoFA}
                onChange={handleChange}
              />
              <span className="switch-custom"></span>
              Enable 2FA
            </label>
          </div>
        </div>

        <button type="submit" className="save-btn"> Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
