// ============================================================
// MongoDB Seed Script
// Chạy: mongosh "mongodb://localhost:27017/your_db" seed_mongodb.js
// Hoặc với Atlas: mongosh "mongodb+srv://..." seed_mongodb.js
// ============================================================

const DB_NAME = "job_portal"; // ← Đổi tên DB tại đây nếu cần

db = db.getSiblingDB(DB_NAME);

// ============================================================
// 1. USERS
// ============================================================
db.users.drop();
db.users.insertMany([
  {
    _id: "user_001",
    name: "Nguyen Van A",
    email: "nguyenvana@email.com",
    resume: "https://example.com/resume/nguyenvana.pdf",
    image: "https://example.com/avatar/nguyenvana.jpg",
  },
  {
    _id: "user_002",
    name: "Tran Thi B",
    email: "tranthib@email.com",
    resume: "https://example.com/resume/tranthib.pdf",
    image: "https://example.com/avatar/tranthib.jpg",
  },
  {
    _id: "user_003",
    name: "Le Van C",
    email: "levanc@email.com",
    resume: "",
    image: "https://example.com/avatar/levanc.jpg",
  },
]);
print("✅ Inserted", db.users.countDocuments(), "users");

// ============================================================
// 2. COMPANIES
// ============================================================
db.companies.drop();
db.companies.insertMany([
  {
    name: "FPT Software",
    email: "hr@fpt.com",
    image: "https://example.com/logo/fpt.png",
    password: "$2b$10$hashedpassword_fpt",
  },
  {
    name: "VNG Corporation",
    email: "career@vng.com.vn",
    image: "https://example.com/logo/vng.png",
    password: "$2b$10$hashedpassword_vng",
  },
  {
    name: "Momo",
    email: "jobs@momo.vn",
    image: "https://example.com/logo/momo.png",
    password: "$2b$10$hashedpassword_momo",
  },
]);
print("✅ Inserted", db.companies.countDocuments(), "companies");

// ============================================================
// 3. JOBS (dùng _id của companies vừa insert)
// ============================================================
const fpt = db.companies.findOne({ name: "FPT Software" })._id;
const vng = db.companies.findOne({ name: "VNG Corporation" })._id;
const momo = db.companies.findOne({ name: "Momo" })._id;

db.jobs.drop();
db.jobs.insertMany([
  {
    title: "Backend Developer (Node.js)",
    description:
      "Phát triển và duy trì hệ thống API RESTful. Làm việc với MongoDB, Redis.",
    location: "Ho Chi Minh",
    category: "Technology",
    level: "Mid-level",
    salary: 25000000,
    date: Date.now(),
    visible: true,
    companyId: fpt,
  },
  {
    title: "Frontend Developer (React)",
    description: "Xây dựng giao diện người dùng với React và TypeScript.",
    location: "Ha Noi",
    category: "Technology",
    level: "Junior",
    salary: 18000000,
    date: Date.now(),
    visible: true,
    companyId: vng,
  },
  {
    title: "Product Manager",
    description:
      "Quản lý vòng đời sản phẩm, làm việc với các team kỹ thuật và kinh doanh.",
    location: "Ho Chi Minh",
    category: "Management",
    level: "Senior",
    salary: 45000000,
    date: Date.now(),
    visible: true,
    companyId: momo,
  },
  {
    title: "DevOps Engineer",
    description: "Quản lý CI/CD pipeline, Kubernetes, AWS infrastructure.",
    location: "Ho Chi Minh",
    category: "Technology",
    level: "Senior",
    salary: 40000000,
    date: Date.now(),
    visible: false,
    companyId: fpt,
  },
]);
print("✅ Inserted", db.jobs.countDocuments(), "jobs");

// ============================================================
// 4. JOB APPLICATIONS
// ============================================================
const job1 = db.jobs.findOne({ title: "Backend Developer (Node.js)" })._id;
const job2 = db.jobs.findOne({ title: "Frontend Developer (React)" })._id;
const job3 = db.jobs.findOne({ title: "Product Manager" })._id;

db.jobapplications.drop();
db.jobapplications.insertMany([
  {
    userId: "user_001",
    companyId: fpt,
    jobId: job1,
    status: "Pending",
    date: Date.now(),
  },
  {
    userId: "user_002",
    companyId: vng,
    jobId: job2,
    status: "Accepted",
    date: Date.now() - 86400000, // 1 ngày trước
  },
  {
    userId: "user_003",
    companyId: momo,
    jobId: job3,
    status: "Rejected",
    date: Date.now() - 172800000, // 2 ngày trước
  },
  {
    userId: "user_001",
    companyId: momo,
    jobId: job3,
    status: "Pending",
    date: Date.now() - 3600000, // 1 giờ trước
  },
]);
print("✅ Inserted", db.jobapplications.countDocuments(), "job applications");

// ============================================================
print("\n🎉 Seed hoàn tất! Database:", DB_NAME);
print("Collections:", db.getCollectionNames());
