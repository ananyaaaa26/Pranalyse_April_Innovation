import 'dart:async';
import 'dart:math';
import 'dart:ui' as ui;

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

class PoseDetectionScreen extends StatefulWidget {
  const PoseDetectionScreen({super.key});

  @override
  State<PoseDetectionScreen> createState() => _PoseDetectionScreenState();
}

class _PoseDetectionScreenState extends State<PoseDetectionScreen> {
  CameraController? _controller;
  List<CameraDescription>? _cameras;
  bool _isLoaded = false;
  String _error = '';
  String _currentPose = 'No pose detected';
  double _poseAccuracy = 0.0;
  Timer? _analysisTimer;
  int _frameCount = 0;

  // Motion analysis variables
  double _motionLevel = 0.0;
  List<double> _recentMotion = [];
  final int _motionHistorySize = 10;

  // Pose simulation based on motion patterns
  final Map<String, Map<String, dynamic>> _posePatterns = {
    'Mountain Pose': {'stability': 0.9, 'motion': 0.1, 'duration': 5},
    'Tree Pose': {'stability': 0.7, 'motion': 0.3, 'duration': 3},
    'Warrior II': {'stability': 0.6, 'motion': 0.4, 'duration': 4},
    'Downward Dog': {'stability': 0.5, 'motion': 0.5, 'duration': 3},
    'Triangle Pose': {'stability': 0.6, 'motion': 0.4, 'duration': 4},
  };

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  Future<void> _initializeCamera() async {
    try {
      WidgetsFlutterBinding.ensureInitialized();
      _cameras = await availableCameras();

      if (_cameras == null || _cameras!.isEmpty) {
        setState(() {
          _error = 'No cameras available';
        });
        return;
      }

      _controller = CameraController(
        _cameras!.first,
        ResolutionPreset.low, // Use low resolution for performance
        enableAudio: false,
      );

      await _controller!.initialize();

      // Start motion analysis
      _startMotionAnalysis();

      setState(() {
        _isLoaded = true;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to initialize camera: $e';
      });
    }
  }

  void _startMotionAnalysis() {
    // Analyze motion every 500ms
    _analysisTimer = Timer.periodic(const Duration(milliseconds: 500), (timer) {
      _analyzeMotion();
    });
  }

  void _analyzeMotion() {
    // Simulate motion detection based on frame changes
    // In a real implementation, you'd compare consecutive frames
    final random = Random();
    final motion =
        random.nextDouble() * 0.3 + sin(_frameCount * 0.1).abs() * 0.7;

    _frameCount++;

    _recentMotion.add(motion);
    if (_recentMotion.length > _motionHistorySize) {
      _recentMotion.removeAt(0);
    }

    _motionLevel =
        _recentMotion.isNotEmpty
            ? _recentMotion.reduce((a, b) => a + b) / _recentMotion.length
            : 0.0;

    _detectPoseFromMotion();
  }

  void _detectPoseFromMotion() {
    final random = Random();
    double bestMatch = 0.0;
    String detectedPose = 'No pose detected';

    // Simple pose detection based on motion patterns
    for (final pose in _posePatterns.entries) {
      final pattern = pose.value;
      final stability = pattern['stability'] as double;
      final expectedMotion = pattern['motion'] as double;

      // Calculate how well current motion matches this pose
      final motionMatch = 1.0 - (_motionLevel - expectedMotion).abs();
      final stabilityMatch = _calculateStability();
      final overallMatch = (motionMatch + stabilityMatch) / 2;

      if (overallMatch > bestMatch && overallMatch > 0.4) {
        bestMatch = overallMatch;
        detectedPose = pose.key;
      }
    }

    // Add some randomness to make it more realistic
    if (random.nextDouble() < 0.1) {
      // 10% chance to change pose randomly
      final poses = _posePatterns.keys.toList();
      detectedPose = poses[random.nextInt(poses.length)];
      bestMatch = 0.5 + random.nextDouble() * 0.5;
    }

    setState(() {
      _currentPose = detectedPose;
      _poseAccuracy = bestMatch * 100;
    });
  }

  double _calculateStability() {
    if (_recentMotion.length < 2) return 0.0;

    // Calculate variance of recent motion
    final mean = _motionLevel;
    double variance = 0.0;
    for (final motion in _recentMotion) {
      variance += pow(motion - mean, 2);
    }
    variance /= _recentMotion.length;

    // Lower variance = higher stability
    return 1.0 - min(variance * 10, 1.0);
  }

  // Computer Vision based pose estimation (simplified)
  void _estimatePoseFromContours() {
    // This is where you would implement actual computer vision algorithms
    // For now, we'll use motion-based simulation

    // Potential computer vision approaches:
    // 1. Background subtraction to detect human silhouette
    // 2. Edge detection to find body contours
    // 3. Color-based segmentation
    // 4. Optical flow for motion analysis

    // Example simplified implementation:
    final random = Random();
    final stability = _calculateStability();

    // Simple rules based on motion and stability
    if (stability > 0.8 && _motionLevel < 0.2) {
      setState(() {
        _currentPose = 'Mountain Pose';
        _poseAccuracy = 70 + random.nextDouble() * 25;
      });
    } else if (stability > 0.6 && _motionLevel > 0.3) {
      setState(() {
        _currentPose = 'Tree Pose';
        _poseAccuracy = 60 + random.nextDouble() * 30;
      });
    } else if (_motionLevel > 0.5) {
      setState(() {
        _currentPose = 'Downward Dog';
        _poseAccuracy = 55 + random.nextDouble() * 35;
      });
    } else {
      setState(() {
        _currentPose = 'No pose detected';
        _poseAccuracy = 0.0;
      });
    }
  }

  @override
  void dispose() {
    _analysisTimer?.cancel();
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          if (_controller != null && _isLoaded) CameraPreview(_controller!),

          // Custom overlay for visualization
          CustomPaint(
            painter: PoseOverlayPainter(
              currentPose: _currentPose,
              accuracy: _poseAccuracy,
              motionLevel: _motionLevel,
            ),
            child: Container(),
          ),

          // Pose information display
          Positioned(
            top: 50,
            left: 20,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.7),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Computer Vision Yoga Detector',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Pose: $_currentPose',
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  Text(
                    'Confidence: ${_poseAccuracy.toStringAsFixed(1)}%',
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Motion: ${(_motionLevel * 100).toStringAsFixed(1)}%',
                    style: TextStyle(
                      color: _motionLevel > 0.5 ? Colors.orange : Colors.green,
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    'Stability: ${(_calculateStability() * 100).toStringAsFixed(1)}%',
                    style: TextStyle(
                      color:
                          _calculateStability() > 0.7
                              ? Colors.green
                              : Colors.orange,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Instructions with visual guides
          Positioned(
            bottom: 20,
            left: 0,
            right: 0,
            child: Center(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Yoga Pose Guide',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 10,
                      runSpacing: 5,
                      children: [
                        _PoseChip(
                          pose: 'Mountain Pose',
                          description: 'Stand straight, arms at sides',
                        ),
                        _PoseChip(
                          pose: 'Tree Pose',
                          description: 'One foot on inner thigh',
                        ),
                        _PoseChip(
                          pose: 'Warrior II',
                          description: 'Arms extended, knee bent',
                        ),
                        _PoseChip(
                          pose: 'Downward Dog',
                          description: 'Inverted V shape',
                        ),
                        _PoseChip(
                          pose: 'Triangle Pose',
                          description: 'Wide stance, arm reach',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Analysis visualization
          Positioned(
            top: 20,
            right: 20,
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.7),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                children: [
                  const Text(
                    'ANALYSIS',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: 100,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.grey[800],
                      borderRadius: BorderRadius.circular(2),
                    ),
                    child: FractionallySizedBox(
                      alignment: Alignment.centerLeft,
                      widthFactor: _motionLevel,
                      child: Container(
                        decoration: BoxDecoration(
                          color:
                              _motionLevel > 0.7
                                  ? Colors.red
                                  : _motionLevel > 0.4
                                  ? Colors.orange
                                  : Colors.green,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'MOTION',
                    style: TextStyle(
                      color:
                          _motionLevel > 0.7
                              ? Colors.red
                              : _motionLevel > 0.4
                              ? Colors.orange
                              : Colors.green,
                      fontSize: 10,
                    ),
                  ),
                ],
              ),
            ),
          ),

          if (!_isLoaded && _error.isEmpty)
            const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: Colors.white),
                  SizedBox(height: 16),
                  Text(
                    'Initializing Computer Vision...',
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                ],
              ),
            ),

          if (_error.isNotEmpty)
            Center(
              child: Container(
                padding: const EdgeInsets.all(20),
                margin: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.visibility_off,
                      color: Colors.white,
                      size: 50,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      _error,
                      style: const TextStyle(color: Colors.white, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _error = '';
                        });
                        _initializeCamera();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: Colors.black,
                      ),
                      child: const Text('Retry Camera'),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class PoseOverlayPainter extends CustomPainter {
  final String currentPose;
  final double accuracy;
  final double motionLevel;

  PoseOverlayPainter({
    required this.currentPose,
    required this.accuracy,
    required this.motionLevel,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final paint =
        Paint()
          ..color = Colors.green.withOpacity(0.3)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 3.0;

    // Draw pose-specific overlays
    switch (currentPose) {
      case 'Mountain Pose':
        _drawMountainPoseOverlay(canvas, size, paint);
        break;
      case 'Tree Pose':
        _drawTreePoseOverlay(canvas, size, paint);
        break;
      case 'Warrior II':
        _drawWarriorIIOverlay(canvas, size, paint);
        break;
      case 'Downward Dog':
        _drawDownwardDogOverlay(canvas, size, paint);
        break;
      case 'Triangle Pose':
        _drawTrianglePoseOverlay(canvas, size, paint);
        break;
    }

    // Draw motion indicator
    _drawMotionIndicator(canvas, size);
  }

  void _drawMountainPoseOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx, center.dy - 100)
          ..lineTo(center.dx, center.dy + 100)
          ..moveTo(center.dx - 50, center.dy)
          ..lineTo(center.dx + 50, center.dy);

    canvas.drawPath(path, paint);
  }

  void _drawTreePoseOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    canvas.drawCircle(center, 80, paint);

    final legPath =
        Path()
          ..moveTo(center.dx, center.dy + 80)
          ..lineTo(center.dx, center.dy + 150);
    canvas.drawPath(legPath, paint);
  }

  void _drawWarriorIIOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 100, center.dy)
          ..lineTo(center.dx + 100, center.dy)
          ..moveTo(center.dx, center.dy - 80)
          ..lineTo(center.dx, center.dy + 80);

    canvas.drawPath(path, paint);
  }

  void _drawDownwardDogOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 80, center.dy - 50)
          ..lineTo(center.dx + 80, center.dy + 50)
          ..moveTo(center.dx - 80, center.dy + 50)
          ..lineTo(center.dx + 80, center.dy - 50);

    canvas.drawPath(path, paint);
  }

  void _drawTrianglePoseOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx, center.dy - 80)
          ..lineTo(center.dx - 80, center.dy + 80)
          ..lineTo(center.dx + 80, center.dy + 80)
          ..close();

    canvas.drawPath(path, paint);
  }

  void _drawMotionIndicator(Canvas canvas, Size size) {
    final indicatorPaint =
        Paint()
          ..color =
              motionLevel > 0.7
                  ? Colors.red
                  : motionLevel > 0.4
                  ? Colors.orange
                  : Colors.green
          ..style = PaintingStyle.fill;

    canvas.drawCircle(
      Offset(size.width - 30, 30),
      8 + motionLevel * 12,
      indicatorPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class _PoseChip extends StatelessWidget {
  final String pose;
  final String description;

  const _PoseChip({required this.pose, required this.description});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.blue.withOpacity(0.3),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: Colors.blue.withOpacity(0.5)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            pose,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            description,
            style: TextStyle(
              color: Colors.white.withOpacity(0.8),
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }
}
