IMPLEMENTASI.md — Huerstory

1. Tujuan

Membangun website landing page Huerstory sebagai Event Content Creator dengan fokus utama pada booking.

Website hanya menggunakan satu halaman. Jangan memperluas scope menjadi sistem admin, dashboard, payment gateway, database, authentication, atau backend.

2. Tech Stack

Gunakan:

Next.js

React

TypeScript

Tailwind CSS

Framer Motion

Gunakan Next.js dengan App Router.

3. Batasan Project

Project ini adalah frontend website.

Tidak perlu membuat:

backend

database

authentication/login

admin dashboard

payment gateway

API eksternal

CMS

server-side booking system

Data booking untuk tahap ini dapat menggunakan state lokal/mock data.

Tujuan implementasi adalah menghasilkan UI dan interaksi frontend yang jelas.

4. Booking Flow

Implementasikan satu alur booking:

Step 1 — Event

User memilih:

Wedding

Engagement

Birthday

Corporate

Other

Step 2 — Date

User memilih tanggal melalui calendar UI.

Tampilkan status:

available

booked

selected

Step 3 — Package

User memilih:

Essential

Signature

Premium

Tampilkan informasi paket dan harga.

Step 4 — Summary

Tampilkan:

event

date

package

total

Button Continue Booking aktif setelah data yang diperlukan tersedia.

Gunakan state React untuk mengelola pilihan.

5. Struktur Komponen

Gunakan komponen sederhana dan terpisah berdasarkan kebutuhan:

components/
├── Navbar
├── Hero
├── Booking
├── EventSelector
├── DatePicker
├── PackageSelector
├── BookingSummary
├── Benefits
├── Stories
├── About
├── HowItWorks
├── Testimonials
├── FAQ
├── FinalCTA
└── Footer

Jangan membuat abstraksi komponen yang tidak diperlukan.

6. Data

Gunakan data statis untuk tahap frontend.

Contoh data:

event types

package information

package price

sample available dates

testimonials

FAQ

Simpan data yang berulang dalam array/object TypeScript agar mudah diubah.

7. Styling

Gunakan Tailwind CSS.

Warna utama:

white: #FFFFFF
pink:  #ffcddb
navy:  #36346c

Gunakan Poppins sebagai font utama.

Gunakan Tangerine sebagai font aksen.

Jangan membuat sistem desain yang terlalu kompleks untuk project ini.

8. Animation

Gunakan Framer Motion hanya pada bagian yang memang membutuhkan motion.

Contoh:

hero reveal

section reveal

button hover

event selection

package selection

image hover

mobile menu

Hindari:

animasi terus-menerus

parallax berlebihan

loading animation yang tidak perlu

animasi booking yang memperlambat user

9. Responsive

Prioritaskan desktop pada proses desain.

Pastikan layout berjalan pada:

1440px

1280px

1024px

768px

375px

430px

Booking desktop:

Event | Date | Package | Summary

Booking mobile:

Event↓Date↓Package↓Summary

Semua tombol dan input harus nyaman digunakan dengan mouse maupun touch.

10. Struktur Halaman

Gunakan satu route utama:

/

Tidak perlu membuat route terpisah untuk:

/services
/packages
/booking
/about
/portfolio

Semua konten berada di landing page.

11. Scope Control

Jangan menambahkan fitur yang tidak ada di desain atau requirement.

Jika menemukan ide seperti:

login

register

dashboard

database

payment

notification system

chat

AI recommendation

maps

CMS

analytics dashboard

jangan implementasikan.

Tetap pada frontend landing page dan booking flow.

12. Prinsip Implementasi

Kode harus sederhana, mudah dibaca, dan mudah dikembangkan.

Jangan membuat kode terlihat kompleks hanya untuk menunjukkan penggunaan teknologi.

Prioritaskan:

UI sesuai desain

booking flow berjalan

responsive

accessibility dasar

component structure yang jelas

animation yang ringan

clean code

Jangan mengubah konsep desain tanpa alasan yang jelas.

Jika ada bagian yang belum ditentukan, pilih solusi paling sederhana yang tetap konsisten dengan desain Huerstory.