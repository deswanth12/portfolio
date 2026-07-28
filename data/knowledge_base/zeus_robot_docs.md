# Zeus Robot — Autonomous Multipurpose Robotics System

## Overview
Zeus Robot is an advanced autonomous robotic platform designed for navigation, obstacle avoidance, computer vision tasks, and remote environmental telemetry. Built as a hardware-software integration project by K Deswanth, Zeus combines embedded electronics, microcontrollers, real-time operating systems, and edge AI vision models.

## Key Technical Features
- **Autonomous Navigation & SLAM**: Implements Simultaneous Localization and Mapping (SLAM) for indoor path planning and waypoint navigation.
- **Edge AI Vision**: Integrated camera sensor running YOLO-nano and OpenCV for real-time object detection, obstacle classification, and spatial tracking.
- **Sensor Fusion Architecture**: Merges data from LiDAR, ultrasonic distance sensors, IMU (Inertial Measurement Unit), and wheel encoders for accurate spatial state estimation.
- **Remote Telemetry & Dashboard**: Features a web dashboard built with React and WebSockets for live video streaming, telemetry monitoring, and manual override control.

## Hardware & Software Stack
- **Microcontrollers & Processors**: Raspberry Pi 4 B (High-level compute & vision) + Arduino Mega / ESP32 (Low-level motor control & PWM).
- **Robotics Framework**: ROS 2 (Robot Operating System 2 - Humble Hawksbill).
- **Vision & AI**: Python, OpenCV, PyTorch Light, YOLO v8.
- **Communication**: WebSockets, MQTT protocol, Serial UART bridge.

## Engineering Challenges Solved
- Optimized real-time frame rates on edge hardware (Raspberry Pi) using quantization and hardware acceleration.
- Built low-latency motor control loops with PID feedback to handle uneven terrain navigation.
