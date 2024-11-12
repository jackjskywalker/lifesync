package com.example;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class WorkoutPlanner {

    public static void main(String[] args) {
        String filePath = "schedule.json"; 
        JSONObject schedule = readJsonFile(filePath);

        if (schedule == null) {
            System.out.println("Failed to read the JSON file.");
            return;
        }

        Map<String, List<TimeSlot>> weeklySchedule = parseSchedule(schedule);

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter available workout time (start time in 24-hour format, e.g., 05:00): ");
        
        String start = scanner.next();
        System.out.print("Enter available workout time (end time in 24-hour format, e.g., 21:30): ");
        String end = scanner.next();

        System.out.print("Enter the days to be considered for workout (comma-separated, e.g., monday,wednesday,friday): ");
        String daysInput = scanner.next();
        String[] selectedDays = daysInput.split(",");

        int startMinute = parseTime(start);
        int endMinute = parseTime(end);

        List<String> recommendedPlans = recommendWorkoutPlans(weeklySchedule, startMinute, endMinute, selectedDays);

        if (recommendedPlans.isEmpty()) {
            System.out.println("No suitable workout plan found.");
        } else {
            System.out.println("Recommended Workout Plans:");
            for (String plan : recommendedPlans) {
                System.out.println(plan);
            }
        }
    }

    private static JSONObject readJsonFile(String filePath) {
        try (FileReader fileReader = new FileReader(filePath)) {
            StringBuilder jsonContent = new StringBuilder();
            int ch;
            while ((ch = fileReader.read()) != -1) {
                jsonContent.append((char) ch);
            }
            return new JSONObject(jsonContent.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static Map<String, List<TimeSlot>> parseSchedule(JSONObject schedule) {
        Map<String, List<TimeSlot>> weeklySchedule = new HashMap<>();
        String[] days = {"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"};

        for (String day : days) {
            JSONArray activities = schedule.optJSONArray(day); 
            List<TimeSlot> timeSlots = new ArrayList<>();
            if (activities != null) { 
                for (int i = 0; i < activities.length(); i++) {
                    JSONObject activity = activities.getJSONObject(i);
                    String activityStart = activity.getString("start");
                    String activityEnd = activity.getString("end");
                    timeSlots.add(new TimeSlot(parseTime(activityStart), parseTime(activityEnd))); 
                }
            }
            weeklySchedule.put(day, timeSlots);
        }
        return weeklySchedule;
    }

    private static List<String> recommendWorkoutPlans(Map<String, List<TimeSlot>> weeklySchedule, int startMinute, int endMinute, String[] selectedDays) {
        List<String> recommendedPlans = new ArrayList<>();

        List<WorkoutPlan> workoutPlans = List.of(
            new WorkoutPlan("Upper and Lower Split", List.of(65, 65, 45, 45), List.of("Upper", "Upper", "Lower", "Lower")),
            new WorkoutPlan("Push-Pull-Leg", List.of(45, 60, 75), List.of("Push", "Pull", "Leg"))
        );

        for (WorkoutPlan plan : workoutPlans) {
            Map<String, List<TimeSlot>> availableSlots = findAvailableSlots(weeklySchedule, startMinute, endMinute, selectedDays, plan);

            if (availableSlots.size() >= plan.durations.size()) {
                recommendedPlans.add("Recommended Plan: " + plan.name);
                int sessionIndex = 0;
                for (String day : selectedDays) {  // Ensure the days are in the correct order
                    if (availableSlots.containsKey(day) && !availableSlots.get(day).isEmpty() && sessionIndex < plan.durations.size() && sessionIndex < plan.sessions.size()) {
                        TimeSlot slot = availableSlots.get(day).get(0); 
                        recommendedPlans.add(capitalizeFirstLetter(day) + ": " + formatTime(slot.start) + "-" + formatTime(slot.end) + " - " + plan.durations.get(sessionIndex) + " Minutes " + plan.sessions.get(sessionIndex) + " Workout");
                        sessionIndex++;
                    }
                }
            }
        }

        return recommendedPlans;
    }

    private static String formatTime(int minutes) {
        int hours = minutes / 60;
        int mins = minutes % 60;
        return String.format("%02d:%02d", hours, mins);
    }

    private static Map<String, List<TimeSlot>> findAvailableSlots(Map<String, List<TimeSlot>> weeklySchedule, int startMinute, int endMinute, String[] selectedDays, WorkoutPlan plan) {
        Map<String, List<TimeSlot>> availableSlots = new HashMap<>();
        int daysIndex = 0;

        for (int duration : plan.durations) {
            String day = selectedDays[daysIndex % selectedDays.length];
            List<TimeSlot> timeSlots = weeklySchedule.get(day);
            int dayStart = startMinute;
            int dayEnd = endMinute;

            if (timeSlots == null || timeSlots.isEmpty()) {
                if (dayEnd - dayStart >= duration) {
                    availableSlots.put(day, List.of(new TimeSlot(dayStart, dayStart + duration)));
                }
            } else {
                List<TimeSlot> slots = new ArrayList<>();
                for (TimeSlot slot : timeSlots) {
                    if (slot.start > dayStart) {
                        if (slot.start - dayStart >= duration) {
                            slots.add(new TimeSlot(dayStart, dayStart + duration));
                        }
                    }
                    dayStart = Math.max(dayStart, slot.end);
                }
                if (dayEnd - dayStart >= duration) {
                    slots.add(new TimeSlot(dayStart, dayStart + duration));
                }
                if (!slots.isEmpty()) {
                    availableSlots.put(day, slots);
                }
            }
            daysIndex++;
        }

        return availableSlots;
    }

    private static int parseTime(String time) {
        String[] parts = time.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        return hours * 60 + minutes;
    }

    private static String capitalizeFirstLetter(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    static class TimeSlot {
        int start;
        int end;

        TimeSlot(int start, int end) {
            this.start = start;
            this.end = end;
        }
    }

    static class WorkoutPlan {
        String name;
        List<Integer> durations;
        List<String> sessions;

        WorkoutPlan(String name, List<Integer> durations, List<String> sessions) {
            this.name = name;
            this.durations = durations;
            this.sessions = sessions;
        }
    }
}