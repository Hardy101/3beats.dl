import os
import time


def delete_file_after_delay(file_path, delay_minutes):
    # Convert delay to seconds
    delay_seconds = delay_minutes * 60

    # Sleep for the specified delay
    time.sleep(delay_seconds)

    # Check if the file exists before attempting to delete
    if os.path.exists(file_path):
        # Delete the file
        os.remove(file_path)
        print(f"File '{file_path}' deleted after {delay_minutes} minutes.")
    else:
        print(f"File '{file_path}' not found.")


# Example usage