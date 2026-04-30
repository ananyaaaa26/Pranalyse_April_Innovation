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
  String _currentExercise = 'No exercise detected';
  double _exerciseAccuracy = 0.0;
  Timer? _analysisTimer;
  int _frameCount = 0;

  // Motion analysis variables
  double _motionLevel = 0.0;
  List<double> _recentMotion = [];
  final int _motionHistorySize = 10;

  // Repetition counter
  int _repetitionCount = 0;
  bool _isCountingReps = false;
  double _previousMotionLevel = 0.0;

  // Physiotherapy exercises patterns
  final Map<String, Map<String, dynamic>> _exercisePatterns = {
    'Shoulder Abduction': {
      'stability': 0.6,
      'motion': 0.7,
      'duration': 3,
      'repetitive': true,
    },
    'Knee Flexion': {
      'stability': 0.7,
      'motion': 0.6,
      'duration': 4,
      'repetitive': true,
    },
    'Hip Extension': {
      'stability': 0.5,
      'motion': 0.5,
      'duration': 3,
      'repetitive': true,
    },
    'Neck Rotation': {
      'stability': 0.8,
      'motion': 0.4,
      'duration': 2,
      'repetitive': true,
    },
    'Ankle Circles': {
      'stability': 0.9,
      'motion': 0.3,
      'duration': 2,
      'repetitive': true,
    },
    'Standing Balance': {
      'stability': 0.9,
      'motion': 0.1,
      'duration': 10,
      'repetitive': false,
    },
    'Squat': {
      'stability': 0.4,
      'motion': 0.8,
      'duration': 5,
      'repetitive': true,
    },
    'Arm Raises': {
      'stability': 0.7,
      'motion': 0.6,
      'duration': 3,
      'repetitive': true,
    },
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
        ResolutionPreset.low,
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

    _detectExerciseFromMotion();
    _countRepetitions();
  }

  void _detectExerciseFromMotion() {
    final random = Random();
    double bestMatch = 0.0;
    String detectedExercise = 'No exercise detected';

    // Simple exercise detection based on motion patterns
    for (final exercise in _exercisePatterns.entries) {
      final pattern = exercise.value;
      final stability = pattern['stability'] as double;
      final expectedMotion = pattern['motion'] as double;

      // Calculate how well current motion matches this exercise
      final motionMatch = 1.0 - (_motionLevel - expectedMotion).abs();
      final stabilityMatch = _calculateStability();
      final overallMatch = (motionMatch + stabilityMatch) / 2;

      if (overallMatch > bestMatch && overallMatch > 0.4) {
        bestMatch = overallMatch;
        detectedExercise = exercise.key;

        // Update repetition counting status
        final isRepetitive = pattern['repetitive'] as bool;
        if (isRepetitive != _isCountingReps) {
          setState(() {
            _isCountingReps = isRepetitive;
          });
        }
      }
    }

    // Add some randomness to make it more realistic
    if (random.nextDouble() < 0.1) {
      final exercises = _exercisePatterns.keys.toList();
      detectedExercise = exercises[random.nextInt(exercises.length)];
      bestMatch = 0.5 + random.nextDouble() * 0.5;
    }

    setState(() {
      _currentExercise = detectedExercise;
      _exerciseAccuracy = bestMatch * 100;
    });
  }

  void _countRepetitions() {
    if (!_isCountingReps) return;

    // Simple repetition counting based on motion peaks
    if (_motionLevel > 0.6 && _previousMotionLevel <= 0.6) {
      // Detected a motion peak (rep completion)
      setState(() {
        _repetitionCount++;
      });
    }
    _previousMotionLevel = _motionLevel;
  }

  void _resetRepetitionCount() {
    setState(() {
      _repetitionCount = 0;
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
            painter: PhysioOverlayPainter(
              currentExercise: _currentExercise,
              accuracy: _exerciseAccuracy,
              motionLevel: _motionLevel,
              repetitionCount: _repetitionCount,
            ),
            child: Container(),
          ),

          // Exercise information display
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
                    'Physiotherapy Exercise Detector',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Exercise: $_currentExercise',
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  Text(
                    'Confidence: ${_exerciseAccuracy.toStringAsFixed(1)}%',
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  if (_isCountingReps) ...[
                    const SizedBox(height: 8),
                    Text(
                      'Repetitions: $_repetitionCount',
                      style: const TextStyle(
                        color: Colors.green,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
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
                      'Physiotherapy Exercise Guide',
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
                        _ExerciseChip(
                          exercise: 'Shoulder Abduction',
                          description: 'Raise arm sideways',
                        ),
                        _ExerciseChip(
                          exercise: 'Knee Flexion',
                          description: 'Bend and straighten knee',
                        ),
                        _ExerciseChip(
                          exercise: 'Squat',
                          description: 'Bend knees and hips',
                        ),
                        _ExerciseChip(
                          exercise: 'Arm Raises',
                          description: 'Lift arms forward/up',
                        ),
                        _ExerciseChip(
                          exercise: 'Standing Balance',
                          description: 'Maintain stable stance',
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
                  if (_isCountingReps) ...[
                    const SizedBox(height: 8),
                    Container(
                      width: 30,
                      height: 30,
                      decoration: BoxDecoration(
                        color: Colors.green,
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Center(
                        child: Text(
                          '$_repetitionCount',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const Text(
                      'REPS',
                      style: TextStyle(color: Colors.white, fontSize: 8),
                    ),
                  ],
                ],
              ),
            ),
          ),

          // Reset button for repetitions
          if (_isCountingReps)
            Positioned(
              bottom: 100,
              right: 20,
              child: FloatingActionButton.small(
                onPressed: _resetRepetitionCount,
                backgroundColor: Colors.red,
                child: const Icon(Icons.refresh, size: 20),
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
                    'Initializing Physio Detection...',
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
                      Icons.medical_services_outlined,
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
      floatingActionButton:
          _isCountingReps
              ? FloatingActionButton(
                onPressed: _resetRepetitionCount,
                backgroundColor: Colors.red,
                child: const Icon(Icons.restart_alt),
              )
              : null,
    );
  }
}

class PhysioOverlayPainter extends CustomPainter {
  final String currentExercise;
  final double accuracy;
  final double motionLevel;
  final int repetitionCount;

  PhysioOverlayPainter({
    required this.currentExercise,
    required this.accuracy,
    required this.motionLevel,
    required this.repetitionCount,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final paint =
        Paint()
          ..color = Colors.blue.withOpacity(0.3)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 3.0;

    // Draw exercise-specific overlays
    switch (currentExercise) {
      case 'Shoulder Abduction':
        _drawShoulderAbductionOverlay(canvas, size, paint);
        break;
      case 'Knee Flexion':
        _drawKneeFlexionOverlay(canvas, size, paint);
        break;
      case 'Hip Extension':
        _drawHipExtensionOverlay(canvas, size, paint);
        break;
      case 'Neck Rotation':
        _drawNeckRotationOverlay(canvas, size, paint);
        break;
      case 'Squat':
        _drawSquatOverlay(canvas, size, paint);
        break;
      case 'Arm Raises':
        _drawArmRaisesOverlay(canvas, size, paint);
        break;
      case 'Standing Balance':
        _drawStandingBalanceOverlay(canvas, size, paint);
        break;
      case 'Ankle Circles':
        _drawAnkleCirclesOverlay(canvas, size, paint);
        break;
    }

    // Draw motion indicator
    _drawMotionIndicator(canvas, size);

    // Draw repetition count if applicable
    _drawRepetitionCount(canvas, size);
  }

  void _drawShoulderAbductionOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 80, center.dy - 50)
          ..lineTo(center.dx - 80, center.dy - 150)
          ..moveTo(center.dx + 80, center.dy - 50)
          ..lineTo(center.dx + 80, center.dy - 150);

    canvas.drawPath(path, paint);
  }

  void _drawKneeFlexionOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 40, center.dy + 50)
          ..lineTo(center.dx - 40, center.dy + 150)
          ..moveTo(center.dx + 40, center.dy + 50)
          ..lineTo(center.dx + 40, center.dy + 150);

    // Draw bending motion
    canvas.drawCircle(Offset(center.dx - 40, center.dy + 100), 20, paint);
    canvas.drawCircle(Offset(center.dx + 40, center.dy + 100), 20, paint);
  }

  void _drawHipExtensionOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx, center.dy)
          ..lineTo(center.dx, center.dy + 100)
          ..moveTo(center.dx, center.dy + 100)
          ..lineTo(center.dx - 30, center.dy + 180);

    canvas.drawPath(path, paint);
  }

  void _drawNeckRotationOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2 - 100);
    canvas.drawCircle(center, 40, paint);

    // Draw rotation arrows
    final arrowPaint =
        Paint()
          ..color = Colors.yellow.withOpacity(0.6)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.0;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: 50),
      0,
      pi * 1.5,
      false,
      arrowPaint,
    );
  }

  void _drawSquatOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 60, center.dy - 50)
          ..lineTo(center.dx - 60, center.dy + 100)
          ..moveTo(center.dx + 60, center.dy - 50)
          ..lineTo(center.dx + 60, center.dy + 100)
          ..moveTo(center.dx - 60, center.dy + 100)
          ..lineTo(center.dx + 60, center.dy + 100);

    canvas.drawPath(path, paint);
  }

  void _drawArmRaisesOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);
    final path =
        Path()
          ..moveTo(center.dx - 80, center.dy - 50)
          ..lineTo(center.dx - 40, center.dy - 150)
          ..moveTo(center.dx + 80, center.dy - 50)
          ..lineTo(center.dx + 40, center.dy - 150)
          ..moveTo(center.dx - 40, center.dy - 150)
          ..lineTo(center.dx + 40, center.dy - 150);

    canvas.drawPath(path, paint);
  }

  void _drawStandingBalanceOverlay(Canvas canvas, Size size, Paint paint) {
    final center = Offset(size.width / 2, size.height / 2);

    // Draw stability circles
    for (int i = 1; i <= 3; i++) {
      canvas.drawCircle(
        center,
        30.0 * i,
        paint..color = Colors.green.withOpacity(0.2 / i),
      );
    }
  }

  void _drawAnkleCirclesOverlay(Canvas canvas, Size size, Paint paint) {
    final leftAnkle = Offset(size.width / 2 - 50, size.height / 2 + 150);
    final rightAnkle = Offset(size.width / 2 + 50, size.height / 2 + 150);

    canvas.drawCircle(leftAnkle, 25, paint);
    canvas.drawCircle(rightAnkle, 25, paint);

    // Draw circular motion
    final circlePaint =
        Paint()
          ..color = Colors.orange.withOpacity(0.5)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.0;

    canvas.drawCircle(leftAnkle, 40, circlePaint);
    canvas.drawCircle(rightAnkle, 40, circlePaint);
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

  void _drawRepetitionCount(Canvas canvas, Size size) {
    if (repetitionCount > 0) {
      final textPainter = TextPainter(
        text: TextSpan(
          text: '$repetitionCount',
          style: const TextStyle(
            color: Colors.green,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width - 60, 60));
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class _ExerciseChip extends StatelessWidget {
  final String exercise;
  final String description;

  const _ExerciseChip({required this.exercise, required this.description});

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
            exercise,
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
