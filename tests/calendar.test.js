import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calendarCells, moveMonth, sameDay } from '../src/utils/calendar.js';

test('leap-year February has all 29 days and Monday-first padding', () => {
  const cells = calendarCells(new Date(2024, 1, 1));
  assert.equal(cells.length, 35);
  assert.deepEqual(cells.slice(0, 3), [null, null, null]);
  const days = cells.filter(Boolean).map((date) => date.getDate());
  assert.equal(days.length, 29);
  assert.deepEqual(days, Array.from({ length: 29 }, (_, index) => index + 1));
});

test('a Monday-start February can fit exactly four weeks', () => {
  const cells = calendarCells(new Date(2021, 1, 1));
  assert.equal(cells.length, 28);
  assert.equal(cells[0].getDate(), 1);
  assert.equal(cells.at(-1).getDate(), 28);
});

test('a Sunday-start 31-day month uses six Monday-first rows', () => {
  const cells = calendarCells(new Date(2026, 2, 1));
  assert.equal(cells.length, 42);
  assert.deepEqual(cells.slice(0, 6), Array(6).fill(null));
  assert.equal(cells[6].getDate(), 1);
  assert.equal(cells.filter(Boolean).length, 31);
});

test('month navigation crosses year boundaries without overflowing days', () => {
  const december = moveMonth(new Date(2026, 0, 31), -1);
  const january = moveMonth(new Date(2026, 11, 31), 1);
  assert.deepEqual([december.getFullYear(), december.getMonth(), december.getDate()], [2025, 11, 1]);
  assert.deepEqual([january.getFullYear(), january.getMonth(), january.getDate()], [2027, 0, 1]);
});

test('today comparison checks day, month and year', () => {
  assert.equal(sameDay(new Date(2026, 10, 12, 8), new Date(2026, 10, 12, 20)), true);
  assert.equal(sameDay(new Date(2026, 10, 12), new Date(2025, 10, 12)), false);
  assert.equal(sameDay(new Date(2026, 10, 12), new Date(2026, 9, 12)), false);
  assert.equal(sameDay(new Date(2026, 10, 12), new Date(2026, 10, 13)), false);
});
