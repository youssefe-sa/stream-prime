import pdfplumber
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PDF_PATH = BASE_DIR / 'List-Channels.pdf'
OUTPUT_PATH = BASE_DIR / 'channel_list_full.txt'

def extract_pdf_text(pdf_path: Path) -> str:
    lines: list[str] = []
    with pdfplumber.open(pdf_path) as pdf:
        for idx, page in enumerate(pdf.pages, start=1):
            lines.append(f"===== PAGE {idx} =====\n")
            text = page.extract_text() or ""
            lines.append(text)
            lines.append("\n")
    return "\n".join(lines)


def main() -> None:
    if not PDF_PATH.exists():
        raise SystemExit(f"PDF not found at {PDF_PATH}")

    content = extract_pdf_text(PDF_PATH)
    OUTPUT_PATH.write_text(content, encoding="utf-8")
    print(f"Extracted text to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
