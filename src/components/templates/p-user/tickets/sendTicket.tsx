"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { showSwal } from "@/utils/helpers";

interface Department {
  _id: string;
  title: string;
}

interface SubDepartment {
  _id: string;
  title: string;
}

function SendTicket() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
  const [departmentID, setDepartmentID] = useState<string>("-1");
  const [subDepartmentID, setSubDepartmentID] = useState<string>("-1");
  const [priority, setPriority] = useState<number>(1);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data: Department[] = await res.json();
      setDepartments(data);
    };

    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      if (departmentID !== "") {
        const res = await fetch(`/api/departments/sub/${departmentID}`);

        if (res.status === 200) {
          const data: SubDepartment[] = await res.json();
          setSubDepartments(data);
        }
      }
    };

    getSubDepartments();
  }, [departmentID]);

  const sendTicketHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const ticketBody = {
      title,
      body,
      department: departmentID,
      subDepartment: subDepartmentID,
      priority,
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketBody),
    });

    if (res.ok) {
      showSwal("تیکت شما با موفقیت ارسال شد.", "success", [
        "بستن",
        "بسیار عالی",
      ]);
      setTitle("");
      setBody("");
      setDepartmentID("-1");
      setSubDepartmentID("-1");
      setPriority(-1);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select onChange={(event) => setDepartmentID(event.target.value)}>
            <option value="-1">لطفا دپارتمان را انتخاب نمایید</option>

            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>نوع تیکت را انتخاب کنید:</label>
          <select onChange={(event) => setSubDepartmentID(event.target.value)}>
            <option value="-1">لطفا یک مورد را انتخاب نمایید</option>

            {subDepartments.map((subDepartment) => (
              <option key={subDepartment._id} value={subDepartment._id}>
                {subDepartment.title}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            placeholder="عنوان..."
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={priority}
            onChange={(event) => setPriority(parseInt(event.target.value))}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            <option value={1}>کم</option>
            <option value={2}>متوسط</option>
            <option value={3}>بالا</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea
          rows={10}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        ></textarea>
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} onClick={sendTicketHandler}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}

export default SendTicket;
