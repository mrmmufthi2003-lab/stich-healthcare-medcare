import express from 'express';
import path from 'path';
import { db } from './server/db.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Endpoints
// 1. Branches API
app.get('/api/branches', (req, res) => {
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  const branches = db.getBranches(category, search);
  res.json({ success: true, count: branches.length, data: branches });
});

app.get('/api/branches/:id', (req, res) => {
  const branch = db.getBranchById(req.params.id);
  if (!branch) {
    return res.status(404).json({ success: false, message: 'Branch not found' });
  }
  res.json({ success: true, data: branch });
});

// 2. Doctors API
app.get('/api/doctors', (req, res) => {
  const specialty = req.query.specialty as string | undefined;
  const branchId = req.query.branchId as string | undefined;
  const search = req.query.search as string | undefined;
  const doctors = db.getDoctors({ specialty, branchId, search });
  res.json({ success: true, count: doctors.length, data: doctors });
});

app.get('/api/doctors/:id', (req, res) => {
  const doctor = db.getDoctorById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }
  res.json({ success: true, data: doctor });
});

// 3. Specialties API
app.get('/api/specialties', (_req, res) => {
  const specialties = db.getSpecialties();
  res.json({ success: true, count: specialties.length, data: specialties });
});

// 4. Health Packages API
app.get('/api/packages', (_req, res) => {
  const packages = db.getPackages();
  res.json({ success: true, count: packages.length, data: packages });
});

// 5. Appointments API
app.get('/api/appointments', (_req, res) => {
  const appointments = db.getAppointments();
  res.json({ success: true, count: appointments.length, data: appointments });
});

app.post('/api/appointments', (req, res) => {
  const {
    patientName,
    patientEmail,
    patientPhone,
    patientAge,
    gender,
    doctorId,
    doctorName,
    specialty,
    branchId,
    branchName,
    appointmentDate,
    appointmentTime,
    consultationType,
    notes,
  } = req.body;

  if (!patientName || !patientPhone || !appointmentDate || !appointmentTime || !doctorName) {
    return res.status(400).json({
      success: false,
      message: 'Missing required appointment fields (patientName, patientPhone, appointmentDate, appointmentTime, doctorName)',
    });
  }

  const created = db.createAppointment({
    patientName,
    patientEmail: patientEmail || '',
    patientPhone,
    patientAge: patientAge ? Number(patientAge) : undefined,
    gender: gender || 'OTHER',
    doctorId: doctorId || 'generic',
    doctorName,
    specialty: specialty || 'General',
    branchId: branchId || 'generic',
    branchName: branchName || 'Medcare Hospital',
    appointmentDate,
    appointmentTime,
    consultationType: consultationType || 'IN_PERSON',
    notes: notes || '',
  });

  res.status(201).json({
    success: true,
    message: 'Appointment scheduled successfully',
    data: created,
  });
});

app.delete('/api/appointments/:id', (req, res) => {
  const success = db.cancelAppointment(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }
  res.json({ success: true, message: 'Appointment cancelled successfully' });
});

// 6. Inquiries / Contact API
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, subject, message, preferredBranch } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone, and message are required' });
  }
  const inquiry = db.createInquiry({
    name,
    email: email || '',
    phone,
    subject: subject || 'General Inquiry',
    message,
    preferredBranch,
  });
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });
});

// 7. Database Status & VS Code Configuration Endpoint
app.get('/api/db-status', (_req, res) => {
  const stats = db.getDatabaseStats();
  res.json({
    success: true,
    data: stats,
    instructions: {
      vscode_run: 'npm run dev',
      port: PORT,
      database_file: 'data/medcare_database.json',
      schema_file: 'database/schema.sql',
    },
  });
});

// Reset demo state
app.post('/api/reset-demo', (_req, res) => {
  db.resetDatabase();
  res.json({ success: true, message: 'Database reset to default seed data' });
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medcare Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
