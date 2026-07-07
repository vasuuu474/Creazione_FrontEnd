import { useState } from "react";

export default function EnterDetails() {
  const [skills, setSkills] = useState([
    "Project Strategy",
    "Data Analysis",
    "Stakeholder Mgmt",
    "Engineering",
    "UI/UX Design",
  ]);

  const [languages, setLanguages] = useState([
    "English",
    "Spanish",
  ]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
      setShowSkillModal(false);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage("");
      setShowLanguageModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-7xl grid lg:grid-cols-[240px_1fr] gap-6">

        {/* LEFT SIDE */}
        <div>
          <h1
            className="text-2xl font-bold text-[#061b0e]"
            style={{ fontFamily: "Playfair Display" }}
          >
            CollabHub
          </h1>

          <h2
            className="mt-4 text-[28px] leading-[34px] font-bold text-[#061b0e]"
            style={{ fontFamily: "Playfair Display" }}
          >
            Let's build your workspace persona.
          </h2>

          <p className="mt-3 text-sm text-[#586158] leading-6">
            Your profile is how other project managers and consultants
            discover your expertise.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1b3022] text-white flex items-center justify-center text-sm">
                1
              </div>
              <span className="font-medium text-sm">Account Setup</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#1b3022] flex items-center justify-center text-sm">
                2
              </div>
              <span className="font-medium text-sm">Personal Details</span>
            </div>

            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm">Team Invite</span>
            </div>
          </div>

          <div className="mt-6 border border-[#e1e4ea] rounded-xl bg-white p-4">
            <div className="w-10 h-10 rounded-full bg-[#d0e9d4]" />
            <div className="h-2 bg-gray-200 rounded mt-3" />
            <div className="h-2 bg-gray-200 rounded mt-2 w-4/5" />
            <div className="h-2 bg-gray-200 rounded mt-2 w-3/5" />
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white border border-[#e1e4ea] rounded-2xl p-5 shadow-sm">

          <h2
            className="text-2xl font-bold text-[#061b0e]"
            style={{ fontFamily: "Playfair Display" }}
          >
            Enter Details
          </h2>

          <p className="text-sm text-[#586158] mt-1">
            Build your professional profile
          </p>

          <div className="mt-5">
            <div className="flex justify-between text-xs text-[#586158]">
              <span>Step 1 of 4</span>
              <span>25%</span>
            </div>

            <div className="h-2 bg-[#e7e8eb] rounded-full mt-2">
              <div className="h-2 w-1/4 bg-[#1b3022] rounded-full"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider">
                Full Name
              </label>

              <input
                placeholder="Alex Rivera"
                className="w-full h-10 px-3 mt-2 rounded-lg border border-[#e1e4ea] bg-[#f8f9fc] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider">
                Location
              </label>

              <input
                placeholder="e.g. London, UK"
                className="w-full h-10 px-3 mt-2 rounded-lg border border-[#e1e4ea] bg-[#f8f9fc] text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider">
              Professional Bio
            </label>

            <textarea
              rows={3}
              placeholder="Briefly describe your expertise and focus areas..."
              className="w-full mt-2 p-3 rounded-lg border border-[#e1e4ea] bg-[#f8f9fc] resize-none text-sm"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">
              Core Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs border ${
                    selectedSkills.includes(skill)
                      ? "bg-[#d0e9d4] border-[#1b3022] text-[#1b3022]"
                      : "bg-white border-[#d7d7d7]"
                  }`}
                >
                  {skill}
                </button>
              ))}

              <button
                onClick={() => setShowSkillModal(true)}
                className="px-3 py-1.5 rounded-lg text-xs border border-dashed border-[#819986] text-[#819986]"
              >
                + Add Other
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">
              Languages
            </h3>

            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => toggleLanguage(language)}
                  className={`px-3 py-1.5 rounded-lg text-xs border ${
                    selectedLanguages.includes(language)
                      ? "bg-[#d0e9d4] border-[#1b3022] text-[#1b3022]"
                      : "bg-white border-[#d7d7d7]"
                  }`}
                >
                  {language}
                </button>
              ))}

              <button
                onClick={() => setShowLanguageModal(true)}
                className="px-3 py-1.5 rounded-lg text-xs border border-dashed border-[#819986] text-[#819986]"
              >
                + Add Other
              </button>
            </div>
          </div>

          <div className="border-t mt-5 pt-4 flex justify-between items-center">
            <button className="text-sm text-[#434843]">
              Save Draft
            </button>

            <div className="flex gap-3">
              <button className="text-sm text-[#434843]">
                Back
              </button>

              <button className="bg-[#1b3022] text-white px-5 py-2 rounded-lg text-sm">
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSkillModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-80">
            <h2 className="font-semibold mb-3">Add Skill</h2>

            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter skill"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowSkillModal(false)}>
                Cancel
              </button>

              <button
                onClick={addSkill}
                className="bg-[#1b3022] text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-80">
            <h2 className="font-semibold mb-3">Add Language</h2>

            <input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter language"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowLanguageModal(false)}>
                Cancel
              </button>

              <button
                onClick={addLanguage}
                className="bg-[#1b3022] text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}