import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import EMAIL_SENDER, EMAIL_PASSWORD, EMAIL_RECEIVER

def send_alert_email(alerts: list) -> bool:
    """
    Send an email notification for triggered alerts.
    Returns True if sent successfully, False otherwise.
    """
    if not alerts:
        return False

    try:
        # --- Build email content ---
        subject = f"AniLyzen Alert — {len(alerts)} issue(s) detected in your pond"

        # Plain text body
        body_lines = [
            "AniLyzen Pond Monitor detected the following alerts:\n",
        ]

        for alert in alerts:
            body_lines.append(f"  Sensor   : {alert['sensor'].upper()}")
            body_lines.append(f"  Message  : {alert['message']}")
            body_lines.append(f"  Timestamp: {alert['timestamp']}")
            body_lines.append("")

        body_lines.append("Please check your pond immediately.")
        body_lines.append("\n— AniLyzen Monitoring System")

        body = "\n".join(body_lines)

        # --- Build the email ---
        msg = MIMEMultipart()
        msg["From"]    = EMAIL_SENDER
        msg["To"]      = EMAIL_RECEIVER
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        # --- Send via Gmail SMTP ---
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, msg.as_string())

        print(f"📧 Alert email sent → {EMAIL_RECEIVER}")
        return True

    except Exception as e:
        print(f"✗ Failed to send email: {e}")
        return False