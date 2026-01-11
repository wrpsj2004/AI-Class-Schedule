import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Constraints,
  defaultConstraints,
  SubjectDetail,
  commonSubjectCodes,
  commonTeachers,
} from "@/data/mockScheduleData";
import {
  Calendar,
  Users,
  BookOpen,
  Clock,
  Settings2,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AutoComplete } from "@/components/AutoComplete";

export default function ConstraintsPage() {
  const navigate = useNavigate();
  const [constraints, setConstraints] =
    useState<Constraints>(defaultConstraints);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubject, setNewSubject] = useState<Partial<SubjectDetail>>({
    name: "",
    code: "",
    credits: 3,
    teacher: "",
  });

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      navigate("/options", { state: { constraints } });
    }, 1500);
  };

  const updateConstraint = <K extends keyof Constraints>(
    key: K,
    value: Constraints[K]
  ) => {
    setConstraints((prev) => ({ ...prev, [key]: value }));
  };

  const addSubject = () => {
    if (newSubject.name && newSubject.code && newSubject.teacher) {
      const subject: SubjectDetail = {
        id: Math.random().toString(36).substr(2, 9),
        name: newSubject.name,
        code: newSubject.code,
        credits: newSubject.credits || 0,
        teacher: newSubject.teacher,
      };
      const newList = [...constraints.subjectList, subject];
      setConstraints((prev) => ({
        ...prev,
        subjectList: newList,
        subjectsCount: newList.length,
      }));
      setNewSubject({ name: "", code: "", credits: 3, teacher: "" });
      setIsAddingSubject(false);
    }
  };

  const removeSubject = (id: string) => {
    const newList = constraints.subjectList.filter((s) => s.id !== id);
    setConstraints((prev) => ({
      ...prev,
      subjectList: newList,
      subjectsCount: newList.length,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">
                ระบบสนับสนุนการตัดสินใจจัดตารางสอน
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Decision Support System for Class Scheduling
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-8 px-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full">
            <span className="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            <span className="font-medium">กำหนดเงื่อนไข</span>
          </div>
          <div className="w-8 h-0.5 bg-border"></div>
          <div className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full">
            <span className="w-6 h-6 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm">
              2
            </span>
            <span>ดูทางเลือก</span>
          </div>
          <div className="w-8 h-0.5 bg-border"></div>
          <div className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full">
            <span className="w-6 h-6 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm">
              3
            </span>
            <span>ประเมินผล</span>
          </div>
        </div>

        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Settings2 className="h-5 w-5 text-primary" />
              กำหนดเงื่อนไขการจัดตารางเรียน
            </CardTitle>
            <CardDescription>
              กรอกข้อมูลพื้นฐานและเลือกเงื่อนไขที่ต้องการให้ระบบนำไปพิจารณา
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Basic Information */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-secondary" />
                ข้อมูลพื้นฐาน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classrooms">จำนวนห้องเรียน</Label>
                  <Input
                    id="classrooms"
                    type="number"
                    min={1}
                    value={constraints.classrooms}
                    onChange={(e) =>
                      updateConstraint(
                        "classrooms",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teachers">จำนวนครู</Label>
                  <Input
                    id="teachers"
                    type="number"
                    min={1}
                    value={constraints.teachers}
                    onChange={(e) =>
                      updateConstraint(
                        "teachers",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    รายชื่อวิชา (จำนวน {constraints.subjectList.length} วิชา)
                  </Label>
                  <div className="space-y-3">
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                      {constraints.subjectList.map((subject) => (
                        <div
                          key={subject.id}
                          className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {subject.name} ({subject.code})
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {subject.credits} หน่วยกิต • ผู้สอน:{" "}
                              {subject.teacher}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubject(subject.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {constraints.subjectList.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
                          ยังไม่มีรายชื่อวิชา
                        </div>
                      )}
                    </div>

                    <Dialog
                      open={isAddingSubject}
                      onOpenChange={setIsAddingSubject}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-dashed border-2 hover:border-primary hover:text-primary transition-all"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          เพิ่มวิชาใหม่
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>เพิ่มวิชาใหม่</DialogTitle>
                          <DialogDescription>
                            กรอกข้อมูลวิชาที่ต้องการเพิ่มลงในระบบ
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              ชื่อวิชา
                            </Label>
                            <Input
                              id="name"
                              value={newSubject.name}
                              onChange={(e) =>
                                setNewSubject((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                              รหัสวิชา
                            </Label>
                            <div className="col-span-3">
                              <AutoComplete
                                options={commonSubjectCodes}
                                value={newSubject.code || ""}
                                onChange={(val) =>
                                  setNewSubject((prev) => ({
                                    ...prev,
                                    code: val,
                                  }))
                                }
                                placeholder="เลือกรหัสวิชาหรือพิมพ์เอง..."
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="credits" className="text-right">
                              หน่วยกิต
                            </Label>
                            <Input
                              id="credits"
                              type="number"
                              value={newSubject.credits}
                              onChange={(e) =>
                                setNewSubject((prev) => ({
                                  ...prev,
                                  credits: parseInt(e.target.value) || 0,
                                }))
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="teacher" className="text-right">
                              ผู้สอน
                            </Label>
                            <div className="col-span-3">
                              <AutoComplete
                                options={commonTeachers}
                                value={newSubject.teacher || ""}
                                onChange={(val) =>
                                  setNewSubject((prev) => ({
                                    ...prev,
                                    teacher: val,
                                  }))
                                }
                                placeholder="เลือกครูผู้สอนหรือพิมพ์เอง..."
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={addSubject}
                            disabled={
                              !newSubject.name ||
                              !newSubject.code ||
                              !newSubject.teacher
                            }
                          >
                            เพิ่มวิชา
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </section>

            {/* Time Settings */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                การตั้งค่าเวลา
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="periodsPerDay">จำนวนคาบต่อวัน</Label>
                  <Select
                    value={constraints.periodsPerDay.toString()}
                    onValueChange={(v) =>
                      updateConstraint("periodsPerDay", parseInt(v))
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="เลือกจำนวนคาบ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 คาบ</SelectItem>
                      <SelectItem value="7">7 คาบ</SelectItem>
                      <SelectItem value="8">8 คาบ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daysPerWeek">จำนวนวันเรียนต่อสัปดาห์</Label>
                  <Select
                    value={constraints.daysPerWeek.toString()}
                    onValueChange={(v) =>
                      updateConstraint("daysPerWeek", parseInt(v))
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="เลือกจำนวนวัน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 วัน (จันทร์-ศุกร์)</SelectItem>
                      <SelectItem value="6">6 วัน (จันทร์-เสาร์)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Workload Settings */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                ภาระงาน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxTeacherPeriods">
                    ครูไม่สอนเกินวันละ (คาบ)
                  </Label>
                  <Input
                    id="maxTeacherPeriods"
                    type="number"
                    min={1}
                    max={constraints.periodsPerDay}
                    value={constraints.maxTeacherPeriodsPerDay}
                    onChange={(e) =>
                      updateConstraint(
                        "maxTeacherPeriodsPerDay",
                        parseInt(e.target.value) || 4
                      )
                    }
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudentPeriods">
                    นักเรียนไม่เรียนเกินวันละ (คาบ)
                  </Label>
                  <Input
                    id="maxStudentPeriods"
                    type="number"
                    min={1}
                    max={constraints.periodsPerDay}
                    value={constraints.maxStudentPeriodsPerDay}
                    onChange={(e) =>
                      updateConstraint(
                        "maxStudentPeriodsPerDay",
                        parseInt(e.target.value) || 6
                      )
                    }
                    className="bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Constraint Checkboxes */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-secondary" />
                เงื่อนไขเพิ่มเติม
              </h3>
              <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="avoidMorning"
                    checked={constraints.avoidMorning}
                    onCheckedChange={(checked) =>
                      updateConstraint("avoidMorning", checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="avoidMorning"
                      className="font-medium cursor-pointer"
                    >
                      หลีกเลี่ยงคาบเช้า
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      ระบบพยายามไม่จัดวิชายากในคาบแรก
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="avoidLastPeriod"
                    checked={constraints.avoidLastPeriod}
                    onCheckedChange={(checked) =>
                      updateConstraint("avoidLastPeriod", checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="avoidLastPeriod"
                      className="font-medium cursor-pointer"
                    >
                      หลีกเลี่ยงคาบสุดท้าย
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      ลดความเหนื่อยล้าของนักเรียน
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="noHeavySubjects"
                    checked={constraints.noHeavySubjectsConsecutive}
                    onCheckedChange={(checked) =>
                      updateConstraint(
                        "noHeavySubjectsConsecutive",
                        checked as boolean
                      )
                    }
                  />
                  <div>
                    <Label
                      htmlFor="noHeavySubjects"
                      className="font-medium cursor-pointer"
                    >
                      วิชาหนักไม่ควรติดกัน
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      เช่น คณิตศาสตร์ ฟิสิกส์ ไม่เรียงติดกัน
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="maxConsecutive"
                    checked={constraints.maxTeacherConsecutivePeriods}
                    onCheckedChange={(checked) =>
                      updateConstraint(
                        "maxTeacherConsecutivePeriods",
                        checked as boolean
                      )
                    }
                  />
                  <div>
                    <Label
                      htmlFor="maxConsecutive"
                      className="font-medium cursor-pointer"
                    >
                      ครูไม่ควรมีคาบติดกันเกิน 3 คาบ
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      ป้องกันภาระงานหนักของครู
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="optimizeRoom"
                    checked={constraints.optimizeRoomUsage}
                    onCheckedChange={(checked) =>
                      updateConstraint("optimizeRoomUsage", checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="optimizeRoom"
                      className="font-medium cursor-pointer"
                    >
                      ใช้ห้องเรียนให้คุ้มค่าที่สุด
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      ลดห้องว่างและเพิ่มประสิทธิภาพการใช้พื้นที่
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังประมวลผล...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    <span>ให้ AI เสนอทางเลือกตารางเรียน</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-edu-blue-light rounded-lg border border-primary/20">
          <p className="text-sm text-foreground flex items-start gap-2">
            <span className="text-primary">💡</span>
            <span>
              <strong>หมายเหตุ:</strong> AI
              จะวิเคราะห์เงื่อนไขที่กำหนดและเสนอตารางเรียนหลายทางเลือก
              เพื่อสนับสนุนการตัดสินใจของท่าน
              โดยท่านสามารถเลือกตารางที่เหมาะสมที่สุดได้ด้วยตนเอง
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
