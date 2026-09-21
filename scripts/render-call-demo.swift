// macOS motion-graphics renderer. The conversation and data are illustrative.
// swiftc -module-cache-path /tmp/syncall-swift-cache scripts/render-call-demo.swift -o /tmp/syncall-render
// /tmp/syncall-render public/videos/syncall-incoming-ru.mp4
// /tmp/syncall-render --frame 14 /tmp/syncall-frame.png
import AppKit
import Foundation

let width = 1280
let height = 720
let fps = 30
let duration = 25.0
let starts = [0.0, 4.0, 8.0, 12.0, 19.0]
let ends = [4.0, 8.0, 12.0, 19.0, 25.0]
let blue = NSColor(srgbRed: 0.23, green: 0.56, blue: 1, alpha: 1)
let green = NSColor(srgbRed: 0.29, green: 0.83, blue: 0.66, alpha: 1)
let white = NSColor(srgbRed: 0.95, green: 0.97, blue: 1, alpha: 1)
let muted = NSColor(srgbRed: 0.60, green: 0.66, blue: 0.76, alpha: 1)
let surface = NSColor(srgbRed: 0.055, green: 0.073, blue: 0.11, alpha: 1)
let border = NSColor(srgbRed: 0.15, green: 0.19, blue: 0.26, alpha: 1)

func ease(_ value: Double) -> Double {
    let t = max(0, min(1, value))
    return t * t * (3 - 2 * t)
}
func rect(_ x: Double, _ y: Double, _ w: Double, _ h: Double) -> NSRect {
    NSRect(x: x, y: Double(height) - y - h, width: w, height: h)
}
func roundRect(_ x: Double, _ y: Double, _ w: Double, _ h: Double, _ radius: Double, _ fill: NSColor, _ stroke: NSColor? = nil) {
    let path = NSBezierPath(roundedRect: rect(x, y, w, h), xRadius: radius, yRadius: radius)
    fill.setFill()
    path.fill()
    if let stroke = stroke { stroke.setStroke(); path.lineWidth = 1.5; path.stroke() }
}
func circle(_ x: Double, _ y: Double, _ r: Double, _ fill: NSColor, _ stroke: NSColor? = nil) {
    let path = NSBezierPath(ovalIn: rect(x - r, y - r, r * 2, r * 2))
    fill.setFill(); path.fill()
    if let stroke = stroke { stroke.setStroke(); path.lineWidth = 1.5; path.stroke() }
}
func line(_ points: [(Double, Double)], _ color: NSColor, _ thickness: Double = 2) {
    guard let first = points.first else { return }
    let path = NSBezierPath()
    path.move(to: NSPoint(x: first.0, y: Double(height) - first.1))
    for p in points.dropFirst() { path.line(to: NSPoint(x: p.0, y: Double(height) - p.1)) }
    path.lineWidth = thickness; path.lineCapStyle = .round; path.lineJoinStyle = .round
    color.setStroke(); path.stroke()
}
func text(_ value: String, _ x: Double, _ y: Double, _ w: Double, _ h: Double, _ size: Double, _ color: NSColor = white, _ weight: NSFont.Weight = .regular, _ align: NSTextAlignment = .left) {
    let style = NSMutableParagraphStyle()
    style.lineSpacing = 7
    style.alignment = align
    style.lineBreakMode = .byWordWrapping
    let attributes: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: size, weight: weight),
        .foregroundColor: color,
        .paragraphStyle: style,
    ]
    (value as NSString).draw(with: rect(x, y, w, h), options: [.usesLineFragmentOrigin, .usesFontLeading], attributes: attributes)
}
func check(_ x: Double, _ y: Double, _ size: Double = 12) {
    line([(x - size * 0.7, y), (x - size * 0.15, y + size * 0.5), (x + size * 0.8, y - size * 0.6)], green, 3)
}
func wave(_ x: Double, _ y: Double, _ time: Double, _ color: NSColor = blue) {
    for i in 0..<9 {
        let amplitude = 5 + 19 * abs(sin(time * 3.5 + Double(i) * 0.8)) * (1 - abs(Double(i) - 4) / 6)
        roundRect(x + Double(i) * 10, y - amplitude, 4, amplitude * 2, 2, color)
    }
}
func layer(_ opacity: Double, _ dy: Double = 0, _ draw: () -> Void) {
    guard opacity > 0 else { return }
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.setAlpha(opacity)
    ctx.translateBy(x: 0, y: -dy)
    ctx.beginTransparencyLayer(auxiliaryInfo: nil)
    draw()
    ctx.endTransparencyLayer()
    ctx.restoreGState()
}
func reveal(_ local: Double, _ at: Double, _ draw: () -> Void) {
    let progress = ease((local - at) / 0.5)
    layer(progress, 12 * (1 - progress), draw)
}
func spinner(_ x: Double, _ y: Double, _ time: Double) {
    for i in 0..<8 {
        let a = Double(i) * .pi / 4 + time * 4
        circle(x + cos(a) * 11, y + sin(a) * 11, 2.5, blue.withAlphaComponent(Double(i + 1) / 8))
    }
}
func sourceHeader(_ title: String, _ subtitle: String, _ x: Double, _ y: Double) {
    roundRect(x, y, 43, 43, 12, blue.withAlphaComponent(0.12))
    for offset in [0.0, 7.0, 14.0] {
        line([(x + 13, y + 14 + offset), (x + 30, y + 14 + offset)], blue, 2)
    }
    text(title, x + 59, y - 2, 480, 34, 26, white, .semibold)
    text(subtitle, x + 59, y + 34, 500, 28, 19, muted)
}

func scene(_ index: Int, _ local: Double, _ time: Double) {
    let titles = [
        "Клиент задаёт вопрос",
        "Проверяет, поступила ли оплата",
        "Находит причину в данных компании",
        "Объясняет ситуацию клиенту",
        "Сохраняет результат в CRM",
    ]
    text(titles[index], 80, 146, 1130, 68, 42, white, .semibold)
    switch index {
    case 0:
        roundRect(80, 256, 760, 285, 26, surface, border)
        circle(125, 302, 14, muted.withAlphaComponent(0.15))
        circle(125, 298, 4, muted)
        line([(118, 308), (120, 304), (130, 304), (132, 308)], muted, 2)
        text("Клиент", 151, 284, 260, 42, 22, muted, .medium)
        text("Я оплатил интернет.\nПочему он не работает?", 116, 354, 690, 150, 43, white, .medium)
        line([(866, 398), (910, 398)], border, 2)
        let dot = 866 + (time.truncatingRemainder(dividingBy: 1.8) / 1.8) * 44
        circle(dot, 398, 3, blue)
        circle(1038, 398, 101, blue.withAlphaComponent(0.035))
        circle(1038, 398, 78, blue.withAlphaComponent(0.07), blue.withAlphaComponent(0.4))
        wave(996, 398, time)
        text("Syncall", 914, 284, 248, 44, 30, white, .semibold, .center)
        text("Принимает звонок", 894, 508, 288, 40, 21, muted, .regular, .center)
    case 1:
        roundRect(80, 284, 404, 219, 24, surface, border)
        text("КЛИЕНТ", 110, 311, 300, 30, 15, muted, .semibold)
        text("«Я оплатил интернет.\nПочему он\nне работает?»", 110, 357, 350, 125, 29)
        line([(501, 396), (534, 396)], blue.withAlphaComponent(0.5), 2)
        roundRect(552, 245, 648, 312, 26, surface, border)
        sourceHeader("Биллинг", "Учёт платежей", 584, 273)
        line([(584, 356), (1168, 356)], border, 1)
        if local < 1.35 {
            spinner(606, 421, time)
            text("Проверяет последний платёж…", 638, 402, 510, 50, 27, muted)
        } else {
            reveal(local, 1.35) {
                circle(608, 418, 23, green.withAlphaComponent(0.10)); check(608, 418)
                text("Оплата получена", 648, 394, 500, 62, 35, white, .semibold)
                text("Баланс положительный", 648, 459, 490, 48, 25, muted)
            }
        }
    case 2:
        roundRect(80, 285, 370, 217, 24, surface, border)
        circle(126, 335, 18, green.withAlphaComponent(0.10)); check(126, 335, 10)
        text("Оплата получена", 113, 379, 312, 48, 29, white, .medium)
        text("Проблема не в платеже", 113, 433, 312, 39, 21, muted)
        line([(467, 396), (494, 396)], blue.withAlphaComponent(0.5), 2)
        roundRect(512, 245, 688, 312, 26, surface, border)
        sourceHeader("CRM", "Данные клиента и статус услуги", 544, 273)
        line([(544, 356), (1168, 356)], border, 1)
        if local < 1.05 {
            spinner(566, 421, time)
            text("Проверяет статус по адресу…", 598, 402, 555, 50, 27, muted)
        } else {
            reveal(local, 1.05) {
                text("Авария по адресу клиента", 546, 385, 620, 61, 33, white, .semibold)
                text("Ремонт планируют завершить", 546, 448, 600, 44, 24, muted)
                text("до 18:00", 546, 491, 610, 49, 29, blue, .semibold)
            }
        }
    case 3:
        roundRect(80, 240, 1120, 287, 26, NSColor(srgbRed: 0.04, green: 0.085, blue: 0.155, alpha: 1), blue.withAlphaComponent(0.36))
        text("Syncall", 115, 266, 280, 42, 23, blue, .semibold)
        wave(1065, 287, time, blue.withAlphaComponent(0.8))
        text("Оплата поступила. По вашему адресу авария.\nРемонт планируют завершить до шести вечера.", 115, 332, 1040, 106, 35)
        reveal(local, 2.4) {
            text("Оставить обращение?", 115, 453, 930, 53, 35, white, .medium)
        }
        reveal(local, 4.4) {
            text("Клиент", 567, 556, 230, 38, 20, muted, .regular, .right)
            roundRect(827, 543, 373, 65, 20, surface, border)
            text("Да, пожалуйста.", 855, 557, 330, 48, 28, white)
        }
    default:
        roundRect(216, 244, 848, 322, 26, surface, border)
        circle(267, 300, 25, green.withAlphaComponent(0.10)); check(267, 300)
        text("Обращение создано", 314, 274, 698, 59, 37, white, .semibold)
        line([(248, 347), (1032, 347)], border, 1)
        let labels = ["Оплата проверена", "Причина: авария по адресу", "Передано в техническую поддержку"]
        for (i, label) in labels.enumerated() {
            reveal(local, 0.45 + Double(i) * 0.65) {
                let y = 381 + Double(i) * 55
                check(267, y + 17, 9)
                text(label, 306, y, 710, 47, 26, white)
            }
        }
        reveal(local, 2.6) {
            text("Сотрудник получает данные и историю разговора.", 180, 587, 920, 40, 22, muted, .regular, .center)
        }
    }
}

func render(_ time: Double) -> NSBitmapImageRep {
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: width * 4, bitsPerPixel: 32)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
    NSColor(srgbRed: 0.02, green: 0.027, blue: 0.043, alpha: 1).setFill()
    NSBezierPath(rect: rect(0, 0, Double(width), Double(height))).fill()
    let gradient = NSGradient(starting: blue.withAlphaComponent(0.065), ending: .clear)!
    gradient.draw(fromCenter: NSPoint(x: 1070, y: 460), radius: 0, toCenter: NSPoint(x: 1070, y: 460), radius: 690, options: .drawsAfterEndingLocation)
    wave(80, 55, 0.4)
    text("Syncall", 186, 32, 250, 56, 34, white, .semibold)
    text("ВХОДЯЩАЯ ЛИНИЯ", 80, 107, 560, 32, 16, blue, .semibold)
    roundRect(981, 34, 219, 38, 19, white.withAlphaComponent(0.035), border)
    text("ПРИМЕР РАБОТЫ", 981, 42, 219, 30, 13, muted, .medium, .center)
    for i in 0..<5 {
        // Fade out before each next scene, retaining generous time to read.
        let enter = ease((time - starts[i]) / 0.45)
        let leave = i == 4 ? 1 : ease((ends[i] - time) / 0.3)
        layer(enter * leave, 12 * (1 - enter)) { scene(i, time - starts[i], time) }
    }
    let progressNames = ["Вопрос", "Оплата", "Причина", "Ответ", "Обращение"]
    for i in 0..<5 {
        let x = 80 + Double(i) * 230
        roundRect(x, 655, 200, 3, 1.5, border)
        let progress = min(1, max(0, (time - starts[i]) / (ends[i] - starts[i])))
        if progress > 0 { roundRect(x, 655, 200 * progress, 3, 1.5, blue) }
        text(progressNames[i], x, 674, 200, 27, 16, time >= starts[i] ? white : muted)
    }
    NSGraphicsContext.restoreGraphicsState()
    return bitmap
}

let arguments = CommandLine.arguments
if arguments.count == 4 && arguments[1] == "--frame" {
    let time = Double(arguments[2])!
    let bitmap = render(time)
    try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: arguments[3]))
} else {
    guard arguments.count == 2 else {
        fputs("Usage: render-call-demo OUTPUT.mp4 | --frame SECONDS OUTPUT.png\n", stderr)
        exit(1)
    }
    let destination = URL(fileURLWithPath: arguments[1])
    try FileManager.default.createDirectory(at: destination.deletingLastPathComponent(), withIntermediateDirectories: true)
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/env")
    process.arguments = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning", "-f", "rawvideo", "-pixel_format", "rgba", "-video_size", "1280x720", "-framerate", String(fps), "-i", "pipe:0", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-metadata", "title=Syncall — пример входящего звонка", destination.path]
    let input = Pipe()
    process.standardInput = input
    process.standardOutput = FileHandle.standardError
    try process.run()
    for frame in 0..<Int(duration * Double(fps)) {
        try autoreleasepool {
            let bitmap = render(Double(frame) / Double(fps))
            try input.fileHandleForWriting.write(contentsOf: Data(bytes: bitmap.bitmapData!, count: width * height * 4))
        }
        if frame % (fps * 5) == 0 { fputs("Rendered \(frame / fps) / 25 seconds\n", stderr) }
    }
    try input.fileHandleForWriting.close()
    process.waitUntilExit()
    guard process.terminationStatus == 0 else { exit(process.terminationStatus) }
    let poster = render(14)
    try poster.representation(using: .png, properties: [:])!.write(to: destination.deletingPathExtension().appendingPathExtension("png"))
    print(destination.path)
}
