import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";

export default function EnterDetails() {
  const navigate = useNavigate();

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

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
    setErrors((prev) => ({ ...prev, skills: "" }));
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
    setErrors((prev) => ({ ...prev, languages: "" }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skillVal = newSkill.trim();
      setSkills([...skills, skillVal]);
      setSelectedSkills([...selectedSkills, skillVal]);
      setNewSkill("");
      setShowSkillModal(false);
      setErrors((prev) => ({ ...prev, skills: "" }));
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const langVal = newLanguage.trim();
      setLanguages([...languages, langVal]);
      setSelectedLanguages([...selectedLanguages, langVal]);
      setNewLanguage("");
      setShowLanguageModal(false);
      setErrors((prev) => ({ ...prev, languages: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-7xl grid lg:grid-cols-[240px_1fr] gap-6">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-start pr-4 py-4">
            <h1
              className="text-2xl font-bold text-[#061b0e]"
              style={{ fontFamily: "Playfair Display" }}
            >
              Creazione
            </h1>

            <h2
              className="mt-4 text-[32px] leading-[40px] font-black text-[#0c2a17] tracking-tight mb-4"
              style={{ fontFamily: "Playfair Display" }}
            >
              Let's build your workspace persona.
            </h2>

            <p className="text-sm text-[#4f5c51] leading-relaxed font-medium">
              Your profile is how other project managers and consultants
              discover your expertise.
            </p>
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



            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">
                  Full Name
                </label>

                <input
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  className="w-full text-sm border border-[#d7d7d7] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#1b3022] font-semibold"
                />
                {errors.fullName && (
                  <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-[11px] p-2 rounded-lg font-semibold mt-2 transition-all duration-300 w-fit">
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">
                  Location
                </label>

                <input
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setErrors((prev) => ({ ...prev, location: "" }));
                  }}
                  className="w-full text-sm border border-[#d7d7d7] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#1b3022] font-semibold"
                />
                {errors.location && (
                  <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-[11px] p-2 rounded-lg font-semibold mt-2 transition-all duration-300 w-fit">
                    {errors.location}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider">
                Bio / Description
              </label>

              <textarea
                placeholder="Share a brief overview of your professional background..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-sm border border-[#d7d7d7] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#1b3022] min-h-[100px]"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">
                Professional Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${selectedSkills.includes(skill)
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
              {errors.skills && (
                <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-[11px] p-2 rounded-lg font-semibold mt-2 transition-all duration-300 w-fit">
                  {errors.skills}
                </div>
              )}
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
                    className={`px-3 py-1.5 rounded-lg text-xs border ${selectedLanguages.includes(language)
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
              {errors.languages && (
                <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-[11px] p-2 rounded-lg font-semibold mt-2 transition-all duration-300 w-fit">
                  {errors.languages}
                </div>
              )}
            </div>

            <div className="border-t mt-5 pt-4 flex justify-end items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/home")}
                  className="text-sm text-[#434843] hover:text-[#061b0e] font-semibold px-3 py-2 transition-colors cursor-pointer"
                >
                  Skip
                </button>

                <button
                  onClick={() => {
                    const newErrors = {};
                    if (!fullName.trim()) newErrors.fullName = "Please enter your Full Name";
                    if (!location.trim()) newErrors.location = "Please enter your Location";
                    if (selectedSkills.length === 0) newErrors.skills = "Please select at least one Core Skill";
                    if (selectedLanguages.length === 0) newErrors.languages = "Please select at least one Language";
                    
                    if (Object.keys(newErrors).length > 0) {
                      setErrors(newErrors);
                      return;
                    }
                    setErrors({});

                    const formattedLangs = selectedLanguages.map(l => ({ name: l, level: 'Native' }));

                    // 1. Update Auth Store first with full user details so subscription registers them correctly
                    const currentUser = useAuthStore.getState().currentUser;
                    useAuthStore.getState().setUser({
                      ...currentUser,
                      name: fullName,
                      location: location,
                      bioText: bio,
                      skills: selectedSkills,
                      languages: formattedLangs,
                    });

                    // 2. Update profile store
                    useProfileStore.getState().saveProfileEdits({
                      name: fullName,
                      location: location,
                    });
                    useProfileStore.getState().saveBio(bio);
                    useProfileStore.getState().saveSkills(selectedSkills);
                    useProfileStore.getState().saveLanguages(formattedLangs);

                    navigate("/home");
                  }}
                  className="bg-[#1b3022] hover:bg-[#122017] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
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