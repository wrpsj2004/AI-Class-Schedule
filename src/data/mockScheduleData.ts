// Mock Data สำหรับระบบ DSS จัดตารางสอน

export interface ScheduleCell {
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export interface ScheduleOption {
  id: string;
  name: string;
  score: number;
  level: 'ดีมาก' | 'ดี' | 'ปานกลาง';
  schedule: Record<string, ScheduleCell[]>; // day -> periods
  pros: string[];
  cons: string[];
  suggestions: string[];
  scoreBreakdown: {
    noConflicts: number;
    teacherWorkload: number;
    studentWorkload: number;
    roomEfficiency: number;
    constraintRespect: number;
  };
}

export interface Constraints {
  classrooms: number;
  teachers: number;
  subjects: number;
  periodsPerDay: number;
  daysPerWeek: number;
  maxTeacherPeriodsPerDay: number;
  maxStudentPeriodsPerDay: number;
  avoidMorning: boolean;
  avoidLastPeriod: boolean;
  noHeavySubjectsConsecutive: boolean;
  maxTeacherConsecutivePeriods: boolean;
  optimizeRoomUsage: boolean;
}

const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];

const subjects = [
  { name: 'คณิตศาสตร์', color: 'bg-edu-blue-light text-foreground border-l-4 border-edu-blue' },
  { name: 'วิทยาศาสตร์', color: 'bg-edu-mint-light text-foreground border-l-4 border-edu-mint' },
  { name: 'ภาษาอังกฤษ', color: 'bg-edu-orange-light text-foreground border-l-4 border-edu-orange' },
  { name: 'ภาษาไทย', color: 'bg-purple-100 text-foreground border-l-4 border-purple-500' },
  { name: 'สังคมศึกษา', color: 'bg-yellow-100 text-foreground border-l-4 border-yellow-500' },
  { name: 'พลศึกษา', color: 'bg-green-100 text-foreground border-l-4 border-green-500' },
  { name: 'ศิลปะ', color: 'bg-pink-100 text-foreground border-l-4 border-pink-500' },
  { name: 'คอมพิวเตอร์', color: 'bg-cyan-100 text-foreground border-l-4 border-cyan-500' },
];

const teachers = [
  'อ.สมชาย', 'อ.สมหญิง', 'อ.วิชัย', 'อ.พิมพ์', 'อ.ประยุทธ์',
  'อ.สุดา', 'อ.มานะ', 'อ.รัตนา', 'อ.วีระ', 'อ.จันทร์'
];

const rooms = ['101', '102', '103', '104', '105', '201', '202', '203', 'LAB1', 'LAB2'];

function generateSchedule(periodsPerDay: number, seed: number): Record<string, ScheduleCell[]> {
  const schedule: Record<string, ScheduleCell[]> = {};
  
  days.forEach((day, dayIndex) => {
    const daySchedule: ScheduleCell[] = [];
    for (let i = 0; i < periodsPerDay; i++) {
      const subjectIndex = (dayIndex + i + seed) % subjects.length;
      const teacherIndex = (dayIndex + i + seed + 1) % teachers.length;
      const roomIndex = (dayIndex + seed) % rooms.length;
      
      daySchedule.push({
        subject: subjects[subjectIndex].name,
        teacher: teachers[teacherIndex],
        room: rooms[roomIndex],
        color: subjects[subjectIndex].color,
      });
    }
    schedule[day] = daySchedule;
  });
  
  return schedule;
}

export function generateMockOptions(constraints: Constraints): ScheduleOption[] {
  const options: ScheduleOption[] = [
    {
      id: 'A',
      name: 'ทางเลือก A',
      score: 92,
      level: 'ดีมาก',
      schedule: generateSchedule(constraints.periodsPerDay, 0),
      pros: [
        'ไม่มีคาบชนของครูทุกวัน',
        'นักเรียนไม่เรียนเกิน ' + constraints.maxStudentPeriodsPerDay + ' คาบต่อวัน',
        'การใช้ห้องเรียนมีประสิทธิภาพสูง (95%)',
        'วิชาหนักกระจายตัวดี ไม่อยู่ติดกัน',
        'ครูแต่ละคนมีภาระงานสมดุล',
      ],
      cons: [
        'มีวิชาหนักอยู่คาบเช้าบางวัน',
        'ครูบางคนมีคาบติดกัน 3 คาบ ในวันพุธ',
      ],
      suggestions: [
        'สามารถสลับวิชาคณิตศาสตร์วันจันทร์ไปคาบบ่ายได้',
        'ตารางนี้เหมาะสมที่สุดตามเงื่อนไขที่กำหนด',
      ],
      scoreBreakdown: {
        noConflicts: 30,
        teacherWorkload: 20,
        studentWorkload: 18,
        roomEfficiency: 14,
        constraintRespect: 10,
      },
    },
    {
      id: 'B',
      name: 'ทางเลือก B',
      score: 78,
      level: 'ดี',
      schedule: generateSchedule(constraints.periodsPerDay, 2),
      pros: [
        'ไม่มีวิชาหนักในคาบเช้า',
        'ครูไม่มีคาบติดกันเกิน 2 คาบ',
        'นักเรียนมีเวลาพักเพียงพอ',
      ],
      cons: [
        'การใช้ห้องเรียนมีประสิทธิภาพปานกลาง (75%)',
        'วิชาหนักบางวันยังอยู่ติดกัน',
        'มีห้องว่างบางคาบ',
      ],
      suggestions: [
        'ควรพิจารณาจัดวิชาเพิ่มในช่วงบ่ายวันศุกร์',
        'อาจสลับห้องเรียนเพื่อเพิ่มประสิทธิภาพ',
      ],
      scoreBreakdown: {
        noConflicts: 28,
        teacherWorkload: 18,
        studentWorkload: 15,
        roomEfficiency: 10,
        constraintRespect: 7,
      },
    },
    {
      id: 'C',
      name: 'ทางเลือก C',
      score: 65,
      level: 'ปานกลาง',
      schedule: generateSchedule(constraints.periodsPerDay, 4),
      pros: [
        'ใช้ห้องเรียนได้ครบทุกห้อง',
        'นักเรียนไม่เรียนเกินกำหนด',
        'ครูบางส่วนมีภาระเบา',
      ],
      cons: [
        'มีวิชาหนักติดกัน 2 คาบ ในบางวัน',
        'ครู 2 คนมีคาบติดกัน 4 คาบ',
        'วิชายากอยู่ในคาบเช้า 3 วัน',
        'การกระจายวิชาไม่สมดุล',
      ],
      suggestions: [
        'ควรปรับโครงสร้างตารางใหม่หากต้องการคุณภาพสูงขึ้น',
        'พิจารณาสลับวิชาระหว่างวันเพื่อลดภาระครู',
        'แนะนำให้เลือกทางเลือก A หรือ B แทน',
      ],
      scoreBreakdown: {
        noConflicts: 20,
        teacherWorkload: 15,
        studentWorkload: 15,
        roomEfficiency: 10,
        constraintRespect: 5,
      },
    },
  ];

  return options;
}

export const defaultConstraints: Constraints = {
  classrooms: 10,
  teachers: 15,
  subjects: 8,
  periodsPerDay: 7,
  daysPerWeek: 5,
  maxTeacherPeriodsPerDay: 4,
  maxStudentPeriodsPerDay: 6,
  avoidMorning: false,
  avoidLastPeriod: false,
  noHeavySubjectsConsecutive: true,
  maxTeacherConsecutivePeriods: true,
  optimizeRoomUsage: true,
};

export const periodLabels = [
  'คาบ 1 (08:30-09:20)',
  'คาบ 2 (09:20-10:10)',
  'คาบ 3 (10:30-11:20)',
  'คาบ 4 (11:20-12:10)',
  'คาบ 5 (13:00-13:50)',
  'คาบ 6 (13:50-14:40)',
  'คาบ 7 (14:50-15:40)',
  'คาบ 8 (15:40-16:30)',
];
