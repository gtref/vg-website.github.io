import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the current working directory to construct file URLs
        current_dir = os.getcwd()

        # --- Verify WebDev Auth Ad on index.html ---
        print("Verifying WebDev Auth ad on index.html...")
        index_path = f"file://{os.path.join(current_dir, 'index.html')}"
        page.goto(index_path)

        # Get the iframe and its content frame
        ad_iframe_index = page.locator("#ad-placeholder")
        expect(ad_iframe_index).to_be_visible()
        ad_frame_index = ad_iframe_index.frame_locator(":scope")

        # Verify the ad content is visible within the iframe
        ad_container_webdev = ad_frame_index.locator(".ad-container")
        expect(ad_container_webdev).to_be_visible()
        print("  - Ad content is visible in iframe.")

        page.screenshot(path="jules-scratch/verification/webdev-ad-updated.png")
        print("  - Took screenshot of updated ad.")


        # --- Verify HubWorld Ad on haka-comp.html ---
        print("\\nVerifying HubWorld ad on events/haka-comp.html...")
        page.goto(f"file://{os.path.join(current_dir, 'events/haka-comp.html')}")

        # Get the iframe and its content frame
        ad_iframe_haka = page.locator("#ad-placeholder")
        expect(ad_iframe_haka).to_be_visible()
        ad_frame_haka = ad_iframe_haka.frame_locator(":scope")

        # Verify the ad content is visible within the iframe
        ad_container_hubworld = ad_frame_haka.locator(".ad-container")
        expect(ad_container_hubworld).to_be_visible()
        print("  - Ad content is visible in iframe.")

        page.screenshot(path="jules-scratch/verification/hubworld-ad-updated.png")
        print("  - Took screenshot of updated ad.")


        browser.close()
        print("\\nVerification complete.")

if __name__ == "__main__":
    run_verification()
