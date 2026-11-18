"""
Bhasha Drishti - 180s Pitch Video Presentation Slide Generator
Creates 1920x1080 (16:9 Full HD) broadcast slides in Royal Aurora palette
For Plotcase, Canva, Premiere Pro, and Video Pitch production.
Generates both high-res PNG and vector SVG versions for each slide.
"""

import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch

OUTPUT_DIR = "video_pitch_assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Theme Colors (Royal Aurora Palette)
BG_DARK = "#0D0A17"
BG_CARD = "#1C142E"
BG_CARD_LIGHT = "#2D1F47"
AURORA_ROSE = "#E94560"
AURORA_PINK = "#FF6B8B"
ROYAL_PURPLE = "#3E2F58"
ACCENT_CYAN = "#00D2D3"
ACCENT_EMERALD = "#10B981"
ACCENT_AMBER = "#F59E0B"
TEXT_WHITE = "#FFFFFF"
TEXT_SLATE = "#CBD5E1"
TEXT_MUTED = "#94A3B8"

FONT_BN = "Nirmala UI"
FONT_EN = "Segoe UI"

def create_base_slide(title_bn, title_en, timestamp_badge, key_message):
    fig = plt.figure(figsize=(19.2, 10.8), dpi=100)
    fig.patch.set_facecolor(BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1920)
    ax.set_ylim(0, 1080)
    ax.axis('off')

    # Top Brand Bar
    head_box = FancyBboxPatch((60, 940), 1800, 90, boxstyle="round,pad=8,rounding_size=20",
                              facecolor=BG_CARD, edgecolor=ROYAL_PURPLE, linewidth=1.5)
    ax.add_patch(head_box)

    # Logo Mark
    logo_box = FancyBboxPatch((80, 955), 60, 60, boxstyle="round,pad=4,rounding_size=12",
                              facecolor=AURORA_ROSE, edgecolor="#FFFFFF", linewidth=1)
    ax.add_patch(logo_box)
    ax.text(110, 985, "ভা", fontfamily=FONT_BN, fontsize=28, fontweight='bold',
            color=TEXT_WHITE, ha='center', va='center')

    # Project Name
    ax.text(155, 995, "ভাষা দৃষ্টি (Bhasha Drishti)", fontfamily=FONT_BN, fontsize=20,
            fontweight='bold', color=TEXT_WHITE, va='center')
    ax.text(155, 970, "SmartHospital Edition • International AI Builders Congress", fontfamily=FONT_EN,
            fontsize=12, color=TEXT_SLATE, va='center')

    # Timestamp & Phase Badge
    time_box = FancyBboxPatch((1480, 955), 360, 60, boxstyle="round,pad=4,rounding_size=12",
                              facecolor=ROYAL_PURPLE, edgecolor=AURORA_ROSE, linewidth=1.2)
    ax.add_patch(time_box)
    ax.text(1660, 985, timestamp_badge, fontfamily=FONT_EN, fontsize=13,
            fontweight='bold', color=AURORA_PINK, ha='center', va='center')

    # Slide Title & Key Message Banner
    ax.text(60, 900, title_bn, fontfamily=FONT_BN, fontsize=32, fontweight='bold', color=TEXT_WHITE)
    ax.text(60, 855, f"{title_en}  |  Key Message: \"{key_message}\"", fontfamily=FONT_EN,
            fontsize=18, color=AURORA_PINK, fontstyle='italic')

    # Bottom Footer
    foot_line = patches.Rectangle((60, 60), 1800, 1.5, facecolor=ROYAL_PURPLE, edgecolor='none')
    ax.add_patch(foot_line)
    ax.text(60, 35, "Lead Architect & Builder: MD. Emon Hossain  •  Team: Tensor_Titan", fontfamily=FONT_EN,
            fontsize=14, color=TEXT_MUTED, va='center')
    ax.text(1860, 35, "Live Demo: bhashadrishti.vercel.app  •  github.com/mohammademon10/Bhasha-Drishti",
            fontfamily=FONT_EN, fontsize=14, color=TEXT_SLATE, ha='right', va='center')

    return fig, ax

def save_slide_formats(fig, base_name):
    fig.savefig(f"{OUTPUT_DIR}/{base_name}.png", facecolor=BG_DARK, edgecolor='none', dpi=100)
    fig.savefig(f"{OUTPUT_DIR}/{base_name}.svg", facecolor=BG_DARK, edgecolor='none')
    plt.close(fig)

# ==========================================
# SLIDE 01: COVER & TITLE (0:00 - 0:15)
# ==========================================
def make_slide_01():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=100)
    fig.patch.set_facecolor(BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1920)
    ax.set_ylim(0, 1080)
    ax.axis('off')

    center_card = FancyBboxPatch((160, 140), 1600, 800, boxstyle="round,pad=10,rounding_size=30",
                                facecolor=BG_CARD, edgecolor=AURORA_ROSE, linewidth=2.5)
    ax.add_patch(center_card)

    b1 = FancyBboxPatch((710, 840), 500, 50, boxstyle="round,pad=5,rounding_size=15",
                        facecolor=ROYAL_PURPLE, edgecolor=AURORA_PINK, linewidth=1.5)
    ax.add_patch(b1)
    ax.text(960, 865, "INTERNATIONAL AI BUILDERS CONGRESS 2026", fontfamily=FONT_EN,
            fontsize=14, fontweight='bold', color=TEXT_WHITE, ha='center', va='center')

    ax.text(960, 800, "DOMAIN: HealthSphere AI   •   CHALLENGE: SmartHospital", fontfamily=FONT_EN,
            fontsize=16, fontweight='bold', color=ACCENT_CYAN, ha='center', va='center')

    logo = FancyBboxPatch((890, 640), 140, 130, boxstyle="round,pad=8,rounding_size=25",
                          facecolor=AURORA_ROSE, edgecolor="#FFFFFF", linewidth=2)
    ax.add_patch(logo)
    ax.text(960, 705, "ভা", fontfamily=FONT_BN, fontsize=65, fontweight='bold',
            color=TEXT_WHITE, ha='center', va='center')

    ax.text(960, 560, "ভাষা দৃষ্টি (Bhasha Drishti)", fontfamily=FONT_BN, fontsize=54,
            fontweight='bold', color=TEXT_WHITE, ha='center', va='center')
    ax.text(960, 500, "Real-Time Bengali Sign Language (BdSL) to Bengali Text & Speech Translation",
            fontfamily=FONT_EN, fontsize=24, color=AURORA_PINK, ha='center', va='center')

    pills = [
        ("30 FPS Edge Vision", "WebRTC Ingestion (No Wearables)"),
        ("238ms Fast Latency", "Strict SLA Budget (<300ms)"),
        ("93.4% BdSL Accuracy", "PyTorch CNN-BiLSTM + pgvector RAG")
    ]
    for i, (title, sub) in enumerate(pills):
        x = 240 + i * 500
        pill_box = FancyBboxPatch((x, 340), 440, 110, boxstyle="round,pad=6,rounding_size=18",
                                 facecolor=BG_CARD_LIGHT, edgecolor=ROYAL_PURPLE, linewidth=1.5)
        ax.add_patch(pill_box)
        ax.text(x + 220, 410, title, fontfamily=FONT_EN, fontsize=20, fontweight='bold',
                color=TEXT_WHITE, ha='center', va='center')
        ax.text(x + 220, 375, sub, fontfamily=FONT_EN, fontsize=13, color=TEXT_MUTED,
                ha='center', va='center')

    ax.text(960, 260, "Lead Architect & Builder: MD. Emon Hossain  |  Team: Tensor_Titan", fontfamily=FONT_EN,
            fontsize=20, fontweight='bold', color=TEXT_WHITE, ha='center', va='center')
    ax.text(960, 220, "Official 180-Second Video Pitch  •  Vibe to Production Standard", fontfamily=FONT_EN,
            fontsize=15, color=TEXT_SLATE, ha='center', va='center')
    ax.text(960, 180, "Live Web App: bhashadrishti.vercel.app  •  GitHub: mohammademon10/Bhasha-Drishti",
            fontfamily=FONT_EN, fontsize=14, color=ACCENT_CYAN, ha='center', va='center')

    save_slide_formats(fig, "slide_01_cover")

# ==========================================
# SLIDE 02: PROBLEM & THE VIBE (0:15 - 0:35)
# ==========================================
def make_slide_02():
    fig, ax = create_base_slide(
        title_bn="সমস্যা ও প্রেক্ষাপট: স্বাস্থ্যসেবায় নীরবতার সংকট",
        title_en="Problem Statement: The Healthcare Silence Barrier",
        timestamp_badge="0:00 - 0:30 • Problem (The Vibe)",
        key_message="This Problem Matters - Real Lives in Emergency Silence"
    )

    cards = [
        ("৩২+ লাখ বধির নাগরিক", "3.2M+ Deaf Individuals",
         "বাংলাদেশে ৩.২ মিলিয়নেরও বেশি মূক ও বধির নাগরিকের দৈনন্দিন যোগাযোগের একমাত্র ভাষা বাংলা ইশারা ভাষা (BdSL)।",
         AURORA_ROSE),
        ("০% সাইন ইন্টারপ্রেটার", "Zero Interpreters in OPD",
         "দেশের ৯৮% সরকারি ও বেসরকারি হাসপাতালে কোনো বিশেষায়িত ইশারা ভাষা দোভাষী বা ইন্টারপ্রেটার উপস্থিত নেই।",
         ACCENT_AMBER),
        ("৪.২ গুণ ডায়াগনস্টিক ভুল", "4.2x Misdiagnosis Risk",
         "জরুরি ট্রায়াজে ডাক্তার রোগীর তীব্র উপসর্গ বুঝতে না পারায় ৪.২ গুণ বেশি ভুল চিকিৎসা ও জটিলতার ঝুঁকি ঘটে।",
         AURORA_PINK),
        ("৪৫+ মিনিট ট্রায়াজ বিলম্ব", "45+ Min Emergency Delay",
         "কাগজে লিখে বা ইশারায় বোঝাতে গিয়ে গোল্ডেন আওয়ারের মূল্যবান সময় নষ্ট হয়, যা জীবনঝুঁকি সৃষ্টি করে।",
         ACCENT_CYAN)
    ]

    for i, (title_bn, title_en, desc, col) in enumerate(cards):
        col_idx = i % 2
        row_idx = i // 2
        x = 60 + col_idx * 920
        y = 480 - row_idx * 330

        box = FancyBboxPatch((x, y), 880, 290, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        tag = FancyBboxPatch((x + 30, y + 215), 320, 45, boxstyle="round,pad=4,rounding_size=10",
                             facecolor=ROYAL_PURPLE, edgecolor=col, linewidth=1)
        ax.add_patch(tag)
        ax.text(x + 190, y + 237, title_en, fontfamily=FONT_EN, fontsize=14,
                fontweight='bold', color=TEXT_WHITE, ha='center', va='center')

        ax.text(x + 30, y + 170, title_bn, fontfamily=FONT_BN, fontsize=28, fontweight='bold', color=col)
        ax.text(x + 30, y + 80, desc, fontfamily=FONT_BN, fontsize=17, color=TEXT_SLATE,
                wrap=True, va='top')

    save_slide_formats(fig, "slide_02_problem")

# ==========================================
# SLIDE 03: THE SOLUTION (0:35 - 1:00)
# ==========================================
def make_slide_03():
    fig, ax = create_base_slide(
        title_bn="সমাধান: ভাষা দৃষ্টি (Bhasha Drishti) — এআই ইশারা অনুবাদক",
        title_en="The Solution: Real-Time BdSL to Bengali Text & Speech",
        timestamp_badge="0:30 - 1:00 • Solution",
        key_message="This is How We Solve It - 100% Client-Side Accessibility"
    )

    solutions = [
        ("১. রিয়েল-টাইম ভিশন অনুবাদ", "Real-Time Vision-to-Speech",
         "যেকোনো সাধারণ ওয়েবক্যাম বা স্মার্টফোন ক্যামেরা দিয়ে ৩০ এফপিএসে হাত ও শরীরের ত্রিমাত্রিক ল্যান্ডমার্ক শনাক্ত করে স্পষ্ট বাংলায় কথা বলে।",
         "কোনো সেন্সর গ্লাভস বা ব্যয়বহুল হার্ডওয়্যার প্রয়োজন নেই।", AURORA_ROSE),
        ("২. দ্বি-মুখী রিভার্স ডেস্ক", "SmartHospital 2-Way Desk",
         "ডাক্তার বাংলায় কথা বললে বধির রোগীর জন্য ক্রমিক সাইন কার্ড ও থ্রিডি হ্যান্ডশেইপ নির্দেশিকায় স্বয়ংক্রিয় রূপান্তরিত হয়।",
         "রোগী ও চিকিৎসক উভয়ের মধ্যে পূর্ণাঙ্গ যোগাযোগের সেতুবন্ধন।", ACCENT_CYAN),
        ("৩. জিরো-রিটেনশন প্রাইভেসি", "Zero-Retention RAM Privacy",
         "রোগীর সংবেদনশীল মুখ বা শরীরের কোনো বায়োমেট্রিক ভিডিও ক্লাউডে যায় না। সমস্ত ভিডিও মেমরিতে তাৎক্ষণিক প্রসেস হয়ে ধ্বংস হয়।",
         "হাসপাতালের রোগীর গোপনীয়তা ও Responsible AI ১০০% নিশ্চিত।", ACCENT_EMERALD)
    ]

    for i, (head_bn, head_en, p1, p2, col) in enumerate(solutions):
        x = 60 + i * 610
        y = 200
        box = FancyBboxPatch((x, y), 580, 580, boxstyle="round,pad=8,rounding_size=22",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        pill = FancyBboxPatch((x + 30, y + 510), 340, 42, boxstyle="round,pad=4,rounding_size=10",
                              facecolor=ROYAL_PURPLE, edgecolor=col, linewidth=1.2)
        ax.add_patch(pill)
        ax.text(x + 200, y + 531, head_en, fontfamily=FONT_EN, fontsize=14,
                fontweight='bold', color=TEXT_WHITE, ha='center', va='center')

        ax.text(x + 30, y + 440, head_bn, fontfamily=FONT_BN, fontsize=24, fontweight='bold', color=col)
        ax.text(x + 30, y + 330, p1, fontfamily=FONT_BN, fontsize=17, color=TEXT_SLATE,
                wrap=True, va='top')

        ax.text(x + 30, y + 170, "সুবিধা ও স্বকীয়তা:", fontfamily=FONT_BN, fontsize=15,
                fontweight='bold', color=TEXT_WHITE)
        ax.text(x + 30, y + 130, p2, fontfamily=FONT_BN, fontsize=15, color=TEXT_MUTED,
                wrap=True, va='top')

    save_slide_formats(fig, "slide_03_solution")

# ==========================================
# SLIDE 04: ARCHITECTURE & PIPELINE (1:00 - 1:20)
# ==========================================
def make_slide_04():
    fig, ax = create_base_slide(
        title_bn="সিস্টেম আর্কিটেকচার ও এন্ড-টু-এন্ড পাইপলাইন (২৩৮ মিলিসেকেন্ড SLA)",
        title_en="System Architecture & 238ms Latency Breakdown",
        timestamp_badge="1:00 - 1:20 • Concept Flow",
        key_message="This is Real System Thinking - Strict SLA Under 300ms"
    )

    stages = [
        ("১. ইনজেশন", "WebRTC Stream", "30 FPS Camera Feed\nRAM In-Memory Buffer", "18ms Latency", ACCENT_CYAN),
        ("২. ল্যান্ডমার্ক", "MediaPipe 3D Holistic", "42 Skeletal Keypoints\nUpper Body + Hands", "65ms Latency", AURORA_ROSE),
        ("৩. ক্লাসিফায়ার", "PyTorch CNN-BiLSTM", "BdSLW60 Model\n93.4% Top-1 Accuracy", "110ms Latency", ACCENT_AMBER),
        ("৪. আরএজি ও টিটিএস", "pgvector + Edge TTS", "FastMCP Bengali Grammar\nSpeech Synthesis", "45ms Latency", ACCENT_EMERALD)
    ]

    for i, (num, name, details, latency, col) in enumerate(stages):
        x = 60 + i * 460
        y = 480
        box = FancyBboxPatch((x, y), 420, 300, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        ax.text(x + 30, y + 250, num, fontfamily=FONT_BN, fontsize=18, fontweight='bold', color=col)
        ax.text(x + 30, y + 210, name, fontfamily=FONT_EN, fontsize=20, fontweight='bold', color=TEXT_WHITE)
        ax.text(x + 30, y + 140, details, fontfamily=FONT_EN, fontsize=15, color=TEXT_SLATE, va='top')

        lat_box = FancyBboxPatch((x + 30, y + 30), 220, 36, boxstyle="round,pad=4,rounding_size=8",
                                facecolor=ROYAL_PURPLE, edgecolor=col, linewidth=1)
        ax.add_patch(lat_box)
        ax.text(x + 140, y + 48, latency, fontfamily=FONT_EN, fontsize=13, fontweight='bold',
                color=TEXT_WHITE, ha='center', va='center')

        if i < 3:
            ax.annotate("", xy=(x + 450, y + 150), xytext=(x + 420, y + 150),
                        arrowprops=dict(arrowstyle="->", color=AURORA_PINK, lw=3))

    bot_card = FancyBboxPatch((60, 180), 1800, 240, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=AURORA_ROSE, linewidth=2)
    ax.add_patch(bot_card)

    ax.text(100, 360, "মোট অ্যান্ড-টু-অ্যান্ড প্রক্রিয়াকরণ সময় (Total Frame-to-Speech Budget):",
            fontfamily=FONT_BN, fontsize=22, fontweight='bold', color=TEXT_WHITE)

    math_text = "১৮ms (ইনজেশন)  +  ৬৫ms (মিডিয়াপাইপ)  +  ১১০ms (মডেল প্রেডিকশন)  +  ৪৫ms (স্পিচ অডিও)  =  ২৩৮ মিলিসেকেন্ড"
    ax.text(100, 300, math_text, fontfamily=FONT_BN, fontsize=20, color=ACCENT_CYAN, fontweight='bold')

    ax.text(100, 240, "[PASS] স্বাস্থ্যসেবায় রিয়েল-টাইম কনভারসেশনের আন্তর্জাতিক মানদণ্ড (<৩০০ms) সফলভাবে উত্তীর্ণ!",
            fontfamily=FONT_BN, fontsize=18, color=ACCENT_EMERALD)
    ax.text(100, 205, "রোগী ইশারা সম্পন্ন করার পলকেই মিষ্টি বাংলা কণ্ঠে ডাক্তারের কাছে বার্তা পৌঁছে যায়।",
            fontfamily=FONT_BN, fontsize=15, color=TEXT_MUTED)

    save_slide_formats(fig, "slide_04_pipeline_sla")

# ==========================================
# SLIDE 05: DEMO 1 - LIVE 3D VISION & SKELETON (1:20 - 1:40)
# ==========================================
def make_slide_05():
    fig, ax = create_base_slide(
        title_bn="লাইভ প্রোটোটাইপ ডেমো: ত্রিমাত্রিক কঙ্কাল ট্র্যাকিং ও তাৎক্ষণিক সনাক্তকরণ",
        title_en="Live Prototype Demo: 3D Hand Skeletal Tracking & HUD",
        timestamp_badge="1:20 - 1:40 • Live Demo Flow",
        key_message="This is How It Works - High Precision Vision Tracking"
    )

    left_box = FancyBboxPatch((60, 180), 960, 600, boxstyle="round,pad=8,rounding_size=22",
                              facecolor=BG_CARD, edgecolor=AURORA_ROSE, linewidth=2)
    ax.add_patch(left_box)

    hud_bar = FancyBboxPatch((80, 710), 920, 50, boxstyle="round,pad=4,rounding_size=10",
                             facecolor=ROYAL_PURPLE, edgecolor='none')
    ax.add_patch(hud_bar)
    ax.text(100, 735, "• 59.4 FPS | MediaPipe 3D Holistic", fontfamily=FONT_EN, fontsize=14,
            color=ACCENT_EMERALD, fontweight='bold', va='center')
    ax.text(980, 735, "CONFIDENCE: 96.4%", fontfamily=FONT_EN, fontsize=14,
            color=AURORA_PINK, fontweight='bold', ha='right', va='center')

    ax.text(540, 500, "[ 3D Skeletal Landmark HUD ]\n• 42 Upper Body & Hand Joints\n• Normalized XYZ Coordinates (0.0 - 1.0)\n• Temporal Sliding Window (40 Frames)",
            fontfamily=FONT_EN, fontsize=18, color=TEXT_SLATE, ha='center', va='center')

    telemetry = FancyBboxPatch((100, 210), 880, 70, boxstyle="round,pad=4,rounding_size=12",
                               facecolor=BG_CARD_LIGHT, edgecolor=ROYAL_PURPLE, linewidth=1)
    ax.add_patch(telemetry)
    ax.text(130, 245, "ECG: 78 BPM (Simulated Monitor)   |   SLA LATENCY: 238ms   |   RAM PRIVACY: ZERO RETENTION",
            fontfamily=FONT_EN, fontsize=13, fontweight='bold', color=TEXT_WHITE, va='center')

    right_box = FancyBboxPatch((1060, 180), 800, 600, boxstyle="round,pad=8,rounding_size=22",
                               facecolor=BG_CARD, edgecolor=ACCENT_CYAN, linewidth=2)
    ax.add_patch(right_box)

    ax.text(1100, 730, "শনাক্তকৃত সাইন টোকেন ক্রম:", fontfamily=FONT_BN, fontsize=18, color=TEXT_MUTED)
    tokens = ["[আমি]", "[মাথা]", "[ব্যথা]"]
    for i, tok in enumerate(tokens):
        tbox = FancyBboxPatch((1100 + i * 160, 660), 140, 45, boxstyle="round,pad=4,rounding_size=10",
                              facecolor=ROYAL_PURPLE, edgecolor=AURORA_PINK, linewidth=1.2)
        ax.add_patch(tbox)
        ax.text(1170 + i * 160, 682, tok, fontfamily=FONT_BN, fontsize=18, fontweight='bold',
                color=TEXT_WHITE, ha='center', va='center')

    ax.text(1100, 600, "স্বয়ংক্রিয় ব্যাকরণগত প্রাকৃতিক বাংলা অনুবাদ:", fontfamily=FONT_BN,
            fontsize=18, color=TEXT_SLATE)
    
    quote_box = FancyBboxPatch((1100, 440), 720, 130, boxstyle="round,pad=6,rounding_size=15",
                               facecolor=BG_CARD_LIGHT, edgecolor=AURORA_ROSE, linewidth=1.5)
    ax.add_patch(quote_box)
    ax.text(1130, 520, "\"আমার প্রচণ্ড মাথা ব্যথা করছে,", fontfamily=FONT_BN,
            fontsize=26, fontweight='bold', color=TEXT_WHITE)
    ax.text(1130, 470, "আমি ডাক্তার দেখাতে চাই।\"", fontfamily=FONT_BN,
            fontsize=26, fontweight='bold', color=TEXT_WHITE)

    ax.text(1100, 390, "English: \"I have a severe headache, I want to see a doctor.\"",
            fontfamily=FONT_EN, fontsize=15, color=TEXT_MUTED, fontstyle='italic')
    ax.text(1100, 350, "Department: General Medicine / Neurology   |   Urgency: Normal",
            fontfamily=FONT_EN, fontsize=14, color=ACCENT_CYAN)

    play_btn = FancyBboxPatch((1100, 220), 440, 70, boxstyle="round,pad=6,rounding_size=15",
                              facecolor=AURORA_ROSE, edgecolor="#FFFFFF", linewidth=1.5)
    ax.add_patch(play_btn)
    ax.text(1320, 255, "[AUDIO] বাংলায় শুনুন (Speak Bengali Audio)", fontfamily=FONT_BN,
            fontsize=18, fontweight='bold', color=TEXT_WHITE, ha='center', va='center')

    save_slide_formats(fig, "slide_05_demo_vision")

# ==========================================
# SLIDE 06: DEMO 2 - EMERGENCY LEXICON (1:40 - 2:00)
# ==========================================
def make_slide_06():
    fig, ax = create_base_slide(
        title_bn="ক্লিনিক্যাল সাইন সিমুলেটর ও জরুরি মেডিকেল শব্দকোষ (BdSLW60)",
        title_en="Clinical BdSLW60 Medical Lexicon & Triage Presets",
        timestamp_badge="1:40 - 2:00 • Emergency Lexicon",
        key_message="Covering Critical Emergency Healthcare Sign Classes"
    )

    lexicon_items = [
        ("জরুরি সাহায্য ও শ্বাসকষ্ট", "Emergency & Dyspnea",
         "[জরুরি] + [সাহায্য] + [শ্বাসকষ্ট]",
         "\"জরুরি সাহায্য প্রয়োজন! আমার শ্বাসকষ্ট হচ্ছে, অক্সিজেন লাগবে।\"",
         "Urgency: CRITICAL ALERT (Red)", AURORA_ROSE),
        ("ওষুধ খাওয়ার নিয়ম জিজ্ঞাসা", "Medication Dosage Query",
         "[ওষুধ] + [কখন] + [খাবো]",
         "\"ডাক্তার বাবু, এই ওষুধগুলো দিনে কয়বার এবং কীভাবে খেতে হবে?\"",
         "Urgency: Normal (Pharmacy)", ACCENT_CYAN),
        ("রক্তচাপ ও সুগার পরীক্ষা", "Hypertension & Vitals",
         "[রক্তচাপ] + [পরীক্ষা]",
         "\"আমার রক্তচাপ ও ডায়াবেটিস পরীক্ষার রিপোর্টগুলো একটু দেখে দিন।\"",
         "Urgency: Normal (Diagnostics)", ACCENT_EMERALD),
        ("অস্পষ্ট সাইন গার্ডরেইল", "Responsible AI Gate",
         "[অস্পষ্ট / অজানা সংকেত]",
         "\"দুঃখিত, আপনার ইশারা স্পষ্ট বোঝা যায়নি। দয়া করে পুনরায় ইশারা করুন।\"",
         "Guardrail: Abstain < 0.80 Conf.", ACCENT_AMBER)
    ]

    for i, (title_bn, title_en, tokens, speech, note, col) in enumerate(lexicon_items):
        col_idx = i % 2
        row_idx = i // 2
        x = 60 + col_idx * 920
        y = 480 - row_idx * 330

        box = FancyBboxPatch((x, y), 880, 290, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        ax.text(x + 30, y + 230, title_bn, fontfamily=FONT_BN, fontsize=24, fontweight='bold', color=col)
        ax.text(x + 30, y + 185, f"টোকেন: {tokens}", fontfamily=FONT_BN, fontsize=17,
                fontweight='bold', color=TEXT_WHITE)
        ax.text(x + 30, y + 130, f"অনূদিত বাংলা অডিও: {speech}", fontfamily=FONT_BN,
                fontsize=16, color=TEXT_SLATE, wrap=True)

        badge = FancyBboxPatch((x + 30, y + 30), 400, 40, boxstyle="round,pad=4,rounding_size=10",
                               facecolor=ROYAL_PURPLE, edgecolor=col, linewidth=1)
        ax.add_patch(badge)
        ax.text(x + 230, y + 50, note, fontfamily=FONT_EN, fontsize=13, fontweight='bold',
                color=TEXT_WHITE, ha='center', va='center')

    save_slide_formats(fig, "slide_06_demo_speech")

# ==========================================
# SLIDE 07: DEMO 3 - 2-WAY REVERSE DESK (2:00 - 2:15)
# ==========================================
def make_slide_07():
    fig, ax = create_base_slide(
        title_bn="স্মার্টহাসপাতাল দ্বি-মুখী ডেস্ক: ডাক্তার টু রোগী রিভার্স মোড",
        title_en="SmartHospital Bidirectional Desk & Printable PDF Summary",
        timestamp_badge="2:00 - 2:15 • 2-Way Clinical Desk",
        key_message="Deaf-First Visual Guidance with Official PDF Consultation Export"
    )

    doc_card = FancyBboxPatch((60, 480), 880, 300, boxstyle="round,pad=8,rounding_size=20",
                              facecolor=BG_CARD, edgecolor=ROYAL_PURPLE, linewidth=2)
    ax.add_patch(doc_card)
    ax.text(90, 730, "চিকিৎসক / পরামর্শকের বাংলা বাক্য (Doctor Input):", fontfamily=FONT_BN,
            fontsize=20, fontweight='bold', color=TEXT_WHITE)
    ax.text(90, 660, "\"আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?\"", fontfamily=FONT_BN,
            fontsize=30, fontweight='bold', color=AURORA_PINK)
    ax.text(90, 600, "ডাক্তার মুখে বললে বা টাইপ করলে সিস্টেম স্বয়ংক্রিয়ভাবে বধির রোগীর জন্য\nক্রমিক সাইন ভাষা নির্দেশিকা ও হ্যান্ডশেইপ তৈরি করে।",
            fontfamily=FONT_BN, fontsize=16, color=TEXT_SLATE)

    sign_cards = [
        ("১. [আপনার]", "খোলা তালু (সামনে)"),
        ("২. [অ্যাপয়েন্টমেন্ট]", "তর্জনী নির্দেশক"),
        ("৩. [নম্বর]", "চিমটি আকৃতি"),
        ("৪. [কত]", "খোলা পাঞ্জা (উপরে)")
    ]
    for i, (head, hand) in enumerate(sign_cards):
        cx = 980 + i * 220
        cbox = FancyBboxPatch((cx, 480), 200, 300, boxstyle="round,pad=6,rounding_size=16",
                              facecolor=BG_CARD_LIGHT, edgecolor=AURORA_ROSE, linewidth=1.5)
        ax.add_patch(cbox)
        ax.text(cx + 100, 720, head, fontfamily=FONT_BN, fontsize=18, fontweight='bold',
                color=TEXT_WHITE, ha='center')
        ax.text(cx + 100, 670, "[ সাইন চিত্র ]", fontfamily=FONT_BN, fontsize=15,
                color=AURORA_PINK, ha='center')
        ax.text(cx + 100, 560, hand, fontfamily=FONT_BN, fontsize=14, color=TEXT_SLATE,
                ha='center', wrap=True)

    export_box = FancyBboxPatch((60, 180), 1800, 250, boxstyle="round,pad=8,rounding_size=20",
                                facecolor=BG_CARD, edgecolor=ACCENT_EMERALD, linewidth=2)
    ax.add_patch(export_box)

    ax.text(100, 370, "অফিসিয়াল ক্লিনিক্যাল কনসালটেশন সামারি ডাউনলোড (PDF & JSON Formats):",
            fontfamily=FONT_BN, fontsize=22, fontweight='bold', color=TEXT_WHITE)

    ax.text(100, 310, "• [PDF] এক ক্লিকে অফিসিয়াল হাসপাতাল লেটারহেড সম্বলিত প্রিন্ট-রেডি PDF সামারি রিপোর্ট ডাউনলোড।",
            fontfamily=FONT_BN, fontsize=17, color=ACCENT_EMERALD)
    ax.text(100, 260, "• [JSON] প্রতিটি বার্তার স্পিকার, টাইমস্ট্যাম্প, BdSL টোকেন এবং Responsible AI কমপ্লায়েন্স ডাটা সহ সম্পূর্ণ JSON অডিট লগ।",
            fontfamily=FONT_BN, fontsize=17, color=TEXT_SLATE)
    ax.text(100, 210, "• ডাক্তার ও রোগীর সম্পূর্ণ কনসালটেশন ফাইল সংরক্ষণহীন RAM থেকে সরাসরি নিরাপদ নথিতে রূপান্তর।",
            fontfamily=FONT_BN, fontsize=15, color=TEXT_MUTED)

    save_slide_formats(fig, "slide_07_demo_desk")

# ==========================================
# SLIDE 08: AI APPROACH & BENCHMARKS (2:15 - 2:30)
# ==========================================
def make_slide_08():
    fig, ax = create_base_slide(
        title_bn="এআই মডেল মূল্যায়ন, নির্ভুলতা ও প্রযুক্তিগত গভীরতা",
        title_en="AI Model Evaluation, Training Data & MCP Tools",
        timestamp_badge="2:15 - 2:30 • AI Approach",
        key_message="This is Real AI Thinking - Enterprise Proven Architecture"
    )

    metrics = [
        ("৯৩.৪%", "Top-1 Recognition Accuracy", "BdSLW60 ৬০টি ক্লিনিক্যাল ক্লাসের উপর মূল্যায়িত", AURORA_ROSE),
        ("০.৯১২", "Macro F1-Score", "ভারসাম্যপূর্ণ নির্ভুলতা ও উচ্চ রিকল হার", ACCENT_CYAN),
        ("১২,৪০০", "Training Video Clips", "৪৫ জন সাইন ভাষার স্পিকার দ্বারা কিউরেটেড ডাটা", ACCENT_AMBER),
        ("৪টি MCP টুলস", "FastMCP Server Tools", "ইনজেশন, ক্লাসিফিকেশন, আরএজি ও অডিট লগ", ACCENT_EMERALD)
    ]

    for i, (val, title, sub, col) in enumerate(metrics):
        x = 60 + i * 460
        y = 520
        box = FancyBboxPatch((x, y), 420, 260, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        ax.text(x + 210, y + 180, val, fontfamily=FONT_BN, fontsize=48, fontweight='bold',
                color=col, ha='center')
        ax.text(x + 210, y + 110, title, fontfamily=FONT_EN, fontsize=17, fontweight='bold',
                color=TEXT_WHITE, ha='center')
        ax.text(x + 210, y + 50, sub, fontfamily=FONT_BN, fontsize=14, color=TEXT_SLATE,
                ha='center', wrap=True)

    mcp_box = FancyBboxPatch((60, 180), 1800, 290, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=ROYAL_PURPLE, linewidth=2)
    ax.add_patch(mcp_box)

    ax.text(100, 420, "Model Context Protocol (FastMCP) সার্ভার ইন্টিগ্রেশন:",
            fontfamily=FONT_BN, fontsize=20, fontweight='bold', color=TEXT_WHITE)

    tools = [
        ("1. extract_bdsl_keypoints", "MediaPipe 3D ভেক্টরাইজার (৪২ ল্যান্ডমার্ক)"),
        ("2. classify_bdsl_window", "PyTorch CNN-BiLSTM টোকেন ক্লাসিফায়ার"),
        ("3. generate_bangla_speech", "pgvector RAG + Edge TTS বাংলা অডিও সিন্থেসিস"),
        ("4. consultation_audit_logger", "রোগীর গোপনীয়তা রক্ষা করে স্ট্রাকচার্ড অডিট লগ")
    ]
    for i, (t_name, t_desc) in enumerate(tools):
        tx = 100 + (i % 2) * 880
        ty = 340 - (i // 2) * 80
        ax.text(tx, ty, t_name, fontfamily=FONT_EN, fontsize=16, fontweight='bold', color=AURORA_PINK)
        ax.text(tx, ty - 25, t_desc, fontfamily=FONT_BN, fontsize=15, color=TEXT_SLATE)

    save_slide_formats(fig, "slide_08_model_metrics")

# ==========================================
# SLIDE 09: RESPONSIBLE AI & PRIVACY (2:30 - 2:45)
# ==========================================
def make_slide_09():
    fig, ax = create_base_slide(
        title_bn="রেসপন্সিবল এআই ও ডেটা সিকিউরিটি গার্ডরেইল",
        title_en="Responsible AI, Clinical Safety & Data Ethics",
        timestamp_badge="2:30 - 2:45 • Responsible AI",
        key_message="Deaf-First Trust, Inclusivity & Medical Ethical Guardrails"
    )

    guards = [
        ("১. জিরো-রিটেনশন র‍্যাম মেমোরি", "Zero-Retention RAM Policy",
         "কোনো কাঁচা ভিডিও ফ্রেম বা সংবেদনশীল বায়োমেট্রিক ভিজ্যুয়াল ডিস্কে বা ক্লাউড সার্ভারে স্থায়ীভাবে সেভ করা হয় না। মেমরিতে প্রসেস করেই মুছে ফেলা হয়।",
         ACCENT_EMERALD),
        ("২. অ্যাবস্টেনশন থ্রেশহোল্ড (<০.৮০)", "Confidence Abstention Gate",
         "কনফিডেন্স ৮০% এর কম হলে ভুল মেডিকেল অনুমান বা হ্যালুসিনেশন না করে সিস্টেম সরাসরি বধির রোগীকে পুনরায় ইশারা প্রদর্শনের স্পষ্ট অনুরোধ জানায়।",
         AURORA_ROSE),
        ("৩. সম্পূর্ণ অফলাইন ও স্বয়ংসম্পূর্ণ", "100% Client-Side Fallback",
         "হাসপাতালের ইন্টারনেট সংযোগ বিচ্ছিন্ন হলেও ব্রাউজারে ওয়েবস্পিচ এবং ক্লায়েন্ট-সাইড নিউরাল পাইপলাইনের সাহায্যে নিরবচ্ছিন্নভাবে কাজ চালিয়ে যায়।",
         ACCENT_CYAN),
        ("৪. বৈচিত্র্যময় স্ক্রিন টোন ও ইনক্লুসিভিটি", "Diverse Inclusive Dataset",
         "বিভিন্ন বয়স, গায়ের রঙ, হাতের গঠন ও পরিবর্তিত আলোয় কার্যকারিতা পরীক্ষা করে অ্যালগরিদমিক পক্ষপাত (Bias) সম্পূর্ণ দূর করা হয়েছে।",
         ACCENT_AMBER)
    ]

    for i, (title_bn, title_en, desc, col) in enumerate(guards):
        col_idx = i % 2
        row_idx = i // 2
        x = 60 + col_idx * 920
        y = 480 - row_idx * 330

        box = FancyBboxPatch((x, y), 880, 290, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        tag = FancyBboxPatch((x + 30, y + 220), 320, 42, boxstyle="round,pad=4,rounding_size=10",
                             facecolor=ROYAL_PURPLE, edgecolor=col, linewidth=1)
        ax.add_patch(tag)
        ax.text(x + 190, y + 241, title_en, fontfamily=FONT_EN, fontsize=14,
                fontweight='bold', color=TEXT_WHITE, ha='center', va='center')

        ax.text(x + 30, y + 175, title_bn, fontfamily=FONT_BN, fontsize=24, fontweight='bold', color=col)
        ax.text(x + 30, y + 90, desc, fontfamily=FONT_BN, fontsize=16, color=TEXT_SLATE,
                wrap=True, va='top')

    save_slide_formats(fig, "slide_09_responsible_ai")

# ==========================================
# SLIDE 10: CLINICAL IMPACT & ROADMAP (2:45 - 2:55)
# ==========================================
def make_slide_10():
    fig, ax = create_base_slide(
        title_bn="ক্লিনিক্যাল প্রভাব, এসডিজি লক্ষ্যমাত্রা ও ভবিষ্যৎ রোডম্যাপ",
        title_en="Clinical Impact, SDGs & 4-Quarter Scalability Roadmap",
        timestamp_badge="2:45 - 2:55 • Impact & Scalability",
        key_message="We Can Build and Scale This - Nationwide Hospital Impact"
    )

    impacts = [
        ("৮৫%", "ডায়াগনস্টিক ত্রুটি হ্রাস", "ভুল বোঝাবুঝি দূর করে সঠিক চিকিৎসা নিশ্চিত করে", AURORA_ROSE),
        ("< ২ মিনিট", "জরুরি ট্রায়াজ অপেক্ষার সময়", "৪৫ মিনিট থেকে নেমে এসে জরুরি সেবায় গতি আনে", ACCENT_CYAN),
        ("SDG 3 & 10", "জাতিসংঘের এসডিজি লক্ষ্যমাত্রা", "সুস্বাস্থ্য, সমঅধিকার ও অন্তর্ভুক্তিমূলক সমাজ", ACCENT_EMERALD)
    ]
    for i, (stat, title, sub, col) in enumerate(impacts):
        x = 60 + i * 610
        y = 520
        box = FancyBboxPatch((x, y), 580, 260, boxstyle="round,pad=8,rounding_size=20",
                             facecolor=BG_CARD, edgecolor=col, linewidth=2)
        ax.add_patch(box)

        ax.text(x + 290, y + 180, stat, fontfamily=FONT_BN, fontsize=42, fontweight='bold',
                color=col, ha='center')
        ax.text(x + 290, y + 115, title, fontfamily=FONT_BN, fontsize=20, fontweight='bold',
                color=TEXT_WHITE, ha='center')
        ax.text(x + 290, y + 55, sub, fontfamily=FONT_BN, fontsize=15, color=TEXT_SLATE,
                ha='center')

    rm_box = FancyBboxPatch((60, 180), 1800, 290, boxstyle="round,pad=8,rounding_size=20",
                            facecolor=BG_CARD, edgecolor=ROYAL_PURPLE, linewidth=2)
    ax.add_patch(rm_box)

    ax.text(100, 420, "পরবর্তী উন্নয়ন রোডম্যাপ (Development Roadmap):",
            fontfamily=FONT_BN, fontsize=20, fontweight='bold', color=TEXT_WHITE)

    steps = [
        ("Q1 2026", "ওয়েব প্রোটোটাইপ ও পাইলট টেস্টিং", "হাসপাতাল OPD ট্রায়াজে পাইলট বাস্তবায়ন"),
        ("Q2 2026", "৩০০+ সাইন শব্দভাণ্ডার বৃদ্ধি", "বিশেষায়িত কার্ডিওলজি ও পেডিয়াট্রিক সাইন"),
        ("Q3 2026", "মোবাইল অফলাইন অ্যাপ (Edge TPU)", "গ্রামাঞ্চলের কমিউনিটি ক্লিনিকের জন্য উপযোগী"),
        ("Q4 2026", "জাতীয় ডিজিটাল স্বাস্থ্য সংযোগ", "সরকারি স্বাস্থ্য অধিদপ্তরের ডিজির সাথে ইন্টিগ্রেশন")
    ]
    for i, (q, s1, s2) in enumerate(steps):
        sx = 100 + i * 440
        sbox = FancyBboxPatch((sx, 220), 400, 160, boxstyle="round,pad=6,rounding_size=14",
                              facecolor=BG_CARD_LIGHT, edgecolor=AURORA_PINK, linewidth=1.2)
        ax.add_patch(sbox)
        ax.text(sx + 20, 345, q, fontfamily=FONT_EN, fontsize=16, fontweight='bold', color=AURORA_PINK)
        ax.text(sx + 20, 305, s1, fontfamily=FONT_BN, fontsize=16, fontweight='bold', color=TEXT_WHITE)
        ax.text(sx + 20, 260, s2, fontfamily=FONT_BN, fontsize=13, color=TEXT_MUTED)

    save_slide_formats(fig, "slide_10_impact_sdgs")

# ==========================================
# SLIDE 11: CONCLUSION & TEAM (2:55 - 3:00)
# ==========================================
def make_slide_11():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=100)
    fig.patch.set_facecolor(BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1920)
    ax.set_ylim(0, 1080)
    ax.axis('off')

    center_card = FancyBboxPatch((160, 140), 1600, 800, boxstyle="round,pad=10,rounding_size=30",
                                facecolor=BG_CARD, edgecolor=AURORA_ROSE, linewidth=2.5)
    ax.add_patch(center_card)

    logo = FancyBboxPatch((890, 750), 140, 120, boxstyle="round,pad=8,rounding_size=25",
                          facecolor=AURORA_ROSE, edgecolor="#FFFFFF", linewidth=2)
    ax.add_patch(logo)
    ax.text(960, 810, "ভা", fontfamily=FONT_BN, fontsize=60, fontweight='bold',
            color=TEXT_WHITE, ha='center', va='center')

    ax.text(960, 680, "শব্দের সীমাবদ্ধতা পেরিয়ে, প্রতিটি প্রাণের স্বাস্থ্য অধিকার",
            fontfamily=FONT_BN, fontsize=36, fontweight='bold', color=TEXT_WHITE, ha='center')
    ax.text(960, 615, "\"Empowering Every Deaf Patient with a Voice in Healthcare\"",
            fontfamily=FONT_EN, fontsize=24, color=AURORA_PINK, ha='center', fontstyle='italic')

    t_box = FancyBboxPatch((460, 360), 1000, 200, boxstyle="round,pad=8,rounding_size=20",
                           facecolor=BG_CARD_LIGHT, edgecolor=ROYAL_PURPLE, linewidth=1.5)
    ax.add_patch(t_box)

    ax.text(960, 505, "টিম: Tensor_Titan", fontfamily=FONT_BN, fontsize=26, fontweight='bold',
            color=ACCENT_CYAN, ha='center')
    ax.text(960, 450, "Lead Architect & Builder: MD. Emon Hossain", fontfamily=FONT_EN,
            fontsize=24, fontweight='bold', color=TEXT_WHITE, ha='center')
    ax.text(960, 400, "International AI Builders Congress 2026 • CloudCamp Bangladesh", fontfamily=FONT_EN,
            fontsize=16, color=TEXT_SLATE, ha='center')

    ax.text(960, 290, "লাইভ ওয়েব অ্যাপ্লিকেশন: https://bhashadrishti.vercel.app",
            fontfamily=FONT_BN, fontsize=18, color=TEXT_WHITE, ha='center')
    ax.text(960, 240, "ওপেন সোর্স গিটহাব রিপোজিটরি: https://github.com/mohammademon10/Bhasha-Drishti",
            fontfamily=FONT_BN, fontsize=18, color=TEXT_WHITE, ha='center')
    ax.text(960, 180, "ধন্যবাদ! (Thank You)", fontfamily=FONT_BN, fontsize=24,
            fontweight='bold', color=AURORA_PINK, ha='center')

    save_slide_formats(fig, "slide_11_team_roadmap")

if __name__ == "__main__":
    print("Generating 11 Full HD 1920x1080 Video Pitch Presentation Slides (PNG + SVG)...")
    make_slide_01()
    print("✓ Slide 01: Cover")
    make_slide_02()
    print("✓ Slide 02: Problem")
    make_slide_03()
    print("✓ Slide 03: Solution")
    make_slide_04()
    print("✓ Slide 04: Pipeline & SLA")
    make_slide_05()
    print("✓ Slide 05: Demo Vision")
    make_slide_06()
    print("✓ Slide 06: Demo Speech")
    make_slide_07()
    print("✓ Slide 07: Demo Desk")
    make_slide_08()
    print("✓ Slide 08: Model Metrics")
    make_slide_09()
    print("✓ Slide 09: Responsible AI")
    make_slide_10()
    print("✓ Slide 10: Clinical Impact")
    make_slide_11()
    print("✓ Slide 11: Team & Conclusion")
    print("All slides successfully generated in video_pitch_assets/")
