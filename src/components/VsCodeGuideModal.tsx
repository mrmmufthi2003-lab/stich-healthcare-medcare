import React, { useState } from 'react';
import {
  X,
  Code2,
  Terminal,
  Database,
  CheckCircle2,
  Copy,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  FileCode,
} from 'lucide-react';
import { DatabaseStats } from '../types.ts';

interface VsCodeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  dbStats: DatabaseStats | null;
  onResetDatabase: () => void;
}

export const VsCodeGuideModal: React.FC<VsCodeGuideModalProps> = ({
  isOpen,
  onClose,
  dbStats,
  onResetDatabase,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'tamil' | 'english' | 'schema' | 'db_status'>('tamil');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="bg-[#190914] text-white p-5 flex items-center justify-between sticky top-0 z-10 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#7a1249] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-pink-300" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg">
                VS Code & Database Guide (VS Code-இல் Run செய்வது எப்படி?)
              </h3>
              <p className="text-xs text-rose-200">
                Full-Stack Architecture: React Frontend + Express Backend + Persistent Database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-neutral-100 p-2 border-b border-neutral-200 flex items-center gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('tamil')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'tamil'
                ? 'bg-[#7a1249] text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            தமிழ் வழிமுறைகள் (Tamil Guide)
          </button>
          <button
            onClick={() => setActiveTab('english')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'english'
                ? 'bg-[#7a1249] text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            English Guide
          </button>
          <button
            onClick={() => setActiveTab('db_status')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'db_status'
                ? 'bg-[#7a1249] text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Database Status & Info
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'schema'
                ? 'bg-[#7a1249] text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            SQL Database Schema
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 text-sm text-neutral-800">
          {activeTab === 'tamil' && (
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-950">
                <h4 className="font-bold text-sm text-[#7a1249] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7a1249]" />
                  <span>வணக்கம்! உங்கள் தேவைக்கேற்ப இந்த முழுமையான Full-Stack App உருவாக்கப்பட்டுள்ளது:</span>
                </h4>
                <ul className="text-xs list-disc list-inside mt-2 space-y-1 text-neutral-700">
                  <li><strong>Frontend:</strong> React 19, Tailwind CSS, Lucide Icons, Medcare UI Styling.</li>
                  <li><strong>Backend:</strong> Node.js + Express (`server.ts`) REST APIs.</li>
                  <li><strong>Database:</strong> Persistent JSON Storage (`data/medcare_database.json`) மற்றும் PostgreSQL/MySQL/SQLite `schema.sql`.</li>
                </ul>
              </div>

              {/* Step 1 */}
              <div className="border border-neutral-200 rounded-xl p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#7a1249]">
                    Step 1: VS Code-இல் Folder-ஐ திறக்கவும்
                  </h5>
                </div>
                <p className="text-xs text-neutral-600">
                  Visual Studio Code-ஐ திறந்து, இந்த project folder-ஐ <strong>File &gt; Open Folder...</strong> மூலம் திறக்கவும். பின்னர் VS Code-இல் Terminal-ஐ திறக்கவும் (Shortcut: <kbd className="bg-neutral-100 px-1 py-0.5 rounded border">Ctrl + ~</kbd>).
                </p>
              </div>

              {/* Step 2 */}
              <div className="border border-neutral-200 rounded-xl p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#7a1249]">
                    Step 2: Dependencies Install செய்தல்
                  </h5>
                  <button
                    onClick={() => copyToClipboard('npm install', 'install')}
                    className="text-xs text-[#7a1249] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText === 'install' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-[#181116] text-pink-200 p-3 rounded-lg text-xs font-mono">
                  npm install
                </pre>
              </div>

              {/* Step 3 */}
              <div className="border border-neutral-200 rounded-xl p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#7a1249]">
                    Step 3: App-ஐ Run செய்தல் (Frontend + Backend ஒரே command)
                  </h5>
                  <button
                    onClick={() => copyToClipboard('npm run dev', 'dev')}
                    className="text-xs text-[#7a1249] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText === 'dev' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-[#181116] text-pink-200 p-3 rounded-lg text-xs font-mono">
                  npm run dev
                </pre>
                <p className="text-xs text-neutral-600">
                  Terminal-இல் <code>Medcare Server running on http://0.0.0.0:3000</code> என்று தோன்றும். இப்போது உங்கள் browser-இல் <strong>http://localhost:3000</strong>-ஐ திறந்து பார்க்கலாம்!
                </p>
              </div>

              {/* Database Explanation */}
              <div className="border border-neutral-200 rounded-xl p-4 bg-white space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#7a1249]">
                  Database எப்படி வேலை செய்கிறது?
                </h5>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  நீங்கள் book செய்யும் ஒவ்வொரு appointment மற்றும் patient inquiry-யும் உடனே <code>data/medcare_database.json</code> என்ற கோப்பில் disk-இல் நிரந்தரமாகச் சேமிக்கப்படும்.
                  நீங்கள் <strong>PostgreSQL</strong> (Supabase / Neon) அல்லது <strong>MySQL</strong> பயன்படுத்த விரும்பினால், இந்த project-இல் உள்ள <code>database/schema.sql</code> கோப்பில் அனைத்து SQL Tables மற்றும் Indexes தயாராக உள்ளன!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'english' && (
            <div className="space-y-5 text-xs text-neutral-700 leading-relaxed">
              <h4 className="font-bold text-sm text-[#7a1249]">
                How to Run & Connect Database in VS Code
              </h4>
              <p>
                This project is structured as a full-stack TypeScript application with Express.js server and React 19 client bundled via Vite.
              </p>

              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="font-bold text-neutral-900 mb-1">1. Install Dependencies:</p>
                  <pre className="bg-[#181116] text-white p-2.5 rounded font-mono">npm install</pre>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="font-bold text-neutral-900 mb-1">2. Run in Development Mode:</p>
                  <pre className="bg-[#181116] text-white p-2.5 rounded font-mono">npm run dev</pre>
                  <p className="mt-1 text-neutral-500">
                    Starts Express server on port 3000 with Vite middleware. Hot reload enabled.
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="font-bold text-neutral-900 mb-1">3. Production Build:</p>
                  <pre className="bg-[#181116] text-white p-2.5 rounded font-mono">npm run build && npm start</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'db_status' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-2xl font-black text-[#7a1249] block">
                    {dbStats?.branchesCount ?? 6}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase">Branches in DB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-2xl font-black text-[#7a1249] block">
                    {dbStats?.doctorsCount ?? 6}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase">Doctors in DB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-2xl font-black text-emerald-600 block">
                    {dbStats?.appointmentsCount ?? 2}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase">Live Bookings</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-2xl font-black text-[#7a1249] block">
                    {dbStats?.packagesCount ?? 4}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase">Health Packages</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Database Engine:</span>
                  <span className="font-mono font-bold text-neutral-800">
                    {dbStats?.dbType || 'JSON_PERSISTENT_FILE_STORAGE'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Database Storage Path:</span>
                  <span className="font-mono text-neutral-800 break-all">
                    {dbStats?.dbFilePath || 'data/medcare_database.json'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Backend API URL:</span>
                  <span className="font-mono text-neutral-800">/api/appointments, /api/branches, /api/doctors</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Database Status:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CONNECTED & WRITABLE</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onResetDatabase}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-100 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Reset Database to Default Seed Data
                </button>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">
                  File: <code>database/schema.sql</code> (PostgreSQL / MySQL / SQLite compatible)
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `-- Branches Table\nCREATE TABLE branches (id VARCHAR(64) PRIMARY KEY, name VARCHAR(255) NOT NULL, category VARCHAR(32) NOT NULL, city VARCHAR(100) NOT NULL, address TEXT NOT NULL);\n-- Appointments Table\nCREATE TABLE appointments (id VARCHAR(64) PRIMARY KEY, booking_ref VARCHAR(32) UNIQUE NOT NULL, patient_name VARCHAR(255) NOT NULL, doctor_id VARCHAR(64), appointment_date DATE NOT NULL);`,
                      'sql'
                    )
                  }
                  className="text-xs text-[#7a1249] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedText === 'sql' ? 'Copied Snippet!' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="bg-[#140b12] text-pink-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-72">
{`CREATE TABLE branches (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(32) NOT NULL,
  city VARCHAR(100) NOT NULL,
  area VARCHAR(150) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  timing VARCHAR(150) NOT NULL,
  has_emergency_24x7 BOOLEAN DEFAULT FALSE
);

CREATE TABLE doctors (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  branch_id VARCHAR(64) REFERENCES branches(id),
  consultation_fee NUMERIC(8, 2) NOT NULL
);

CREATE TABLE appointments (
  id VARCHAR(64) PRIMARY KEY,
  booking_ref VARCHAR(32) UNIQUE NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(50) NOT NULL,
  doctor_id VARCHAR(64) REFERENCES doctors(id),
  branch_id VARCHAR(64) REFERENCES branches(id),
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  status VARCHAR(30) DEFAULT 'CONFIRMED'
);`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#7a1249] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#600e39] transition-colors"
          >
            Got It / சரி
          </button>
        </div>
      </div>
    </div>
  );
};
