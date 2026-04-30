import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class PhysioChatScreen extends StatefulWidget {
  const PhysioChatScreen({super.key});

  @override
  State<PhysioChatScreen> createState() => _PhysioChatScreenState();
}

class _PhysioChatScreenState extends State<PhysioChatScreen> {
  final TextEditingController _controller = TextEditingController();
  List<Map<String, dynamic>> messages = [
    {"text": "How can I help you?", "isUser": false},
  ];

  bool isTyping = false;

  void sendMessage() async {
    if (_controller.text.trim().isEmpty) return;

    setState(() {
      messages.add({"text": _controller.text.trim(), "isUser": true});
      isTyping = true;
    });

    _controller.clear();

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      messages.add({"text": "Typing simulation response...", "isUser": false});
      isTyping = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final bgDark = const Color(0xFF2D234A);
    final bgMain = const Color(0xFF46336D);
    final msgBot = const Color(0xFF1E1E28);
    final msgUser = const Color(0xFFBDA6E2);

    return Scaffold(
      backgroundColor: bgMain,

      /// 🚫 Navbar removed
      /// bottomNavigationBar: _buildBottomNav(),
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(bgDark),
            const SizedBox(height: 20),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  ...messages.map(
                    (msg) => _buildMessageBubble(msg, msgBot, msgUser),
                  ),
                  if (isTyping) _buildTypingIndicator(),
                ],
              ),
            ),
            _buildInputBar(),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(Color bgDark) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 24),
      width: double.infinity,
      decoration: BoxDecoration(
        color: bgDark,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(28),
          bottomRight: Radius.circular(28),
        ),
      ),
      child: Column(
        children: const [
          Text(
            "On Beat",
            style: TextStyle(color: Colors.white70, fontSize: 20),
          ),
          SizedBox(height: 8),
          Text(
            "Physiotherapist",
            style: TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ).animate().fade(duration: 600.ms).slideY(begin: -0.2, end: 0),
    );
  }

  Widget _buildMessageBubble(Map msg, Color msgBot, Color msgUser) {
    bool isUser = msg["isUser"];
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
        constraints: const BoxConstraints(maxWidth: 280),
        decoration: BoxDecoration(
          color: isUser ? msgUser : msgBot,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withOpacity(0.2)),
        ),
        child: Text(
          msg["text"],
          style: TextStyle(
            color: isUser ? Colors.black87 : Colors.white,
            fontSize: 16,
          ),
        ),
      ).animate().fade(duration: 500.ms).slideX(begin: isUser ? 0.15 : -0.15),
    );
  }

  Widget _buildTypingIndicator() {
    return Padding(
      padding: const EdgeInsets.only(left: 8, top: 10),
      child: Row(
        children: [
          ...[300, 450, 600].map(
            (ms) => Padding(
              padding: const EdgeInsets.only(right: 6),
              child: Container(
                    width: 10,
                    height: 10,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                  )
                  .animate(onPlay: (c) => c.repeat())
                  .fadeIn(duration: Duration(milliseconds: ms))
                  .scale(duration: Duration(milliseconds: ms)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInputBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: const Color(0xFFBDA6E2).withOpacity(0.7),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white.withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                style: const TextStyle(color: Colors.black87),
                decoration: const InputDecoration(
                  hintText: "Ask Anything",
                  hintStyle: TextStyle(color: Colors.black54),
                  border: InputBorder.none,
                ),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.send, color: Colors.black87),
              onPressed: sendMessage,
            ),
          ],
        ),
      ),
    );
  }
}
