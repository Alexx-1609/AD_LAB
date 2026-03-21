## Activity.xml

<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#121212"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sleep Tracker"
        android:textSize="26sp"
        android:textStyle="bold"
        android:textColor="#FFFFFF"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="40dp"/>

    <Chronometer
        android:id="@+id/chronometer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="36sp"
        android:textColor="#00E5FF"
        app:layout_constraintTop_toBottomOf="@id/title"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="30dp"/>

    <TextView
        android:id="@+id/sleepStage"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sleep Stage: Awake"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        app:layout_constraintTop_toBottomOf="@id/chronometer"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="20dp"/>

    <Button
        android:id="@+id/startBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Start"
        app:layout_constraintTop_toBottomOf="@id/sleepStage"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginStart="40dp"
        android:layout_marginEnd="40dp"
        android:layout_marginTop="30dp"/>

    <Button
        android:id="@+id/stopBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Stop"
        app:layout_constraintTop_toBottomOf="@id/startBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <Button
        android:id="@+id/resetBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Reset"
        app:layout_constraintTop_toBottomOf="@id/stopBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <Button
        android:id="@+id/settingsBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Set Goal"
        app:layout_constraintTop_toBottomOf="@id/resetBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <TextView
        android:id="@+id/avgSleep"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Average Sleep: 0h"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        app:layout_constraintTop_toBottomOf="@id/settingsBtn"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="25dp"/>

    <TextView
        android:id="@+id/studentInfo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Utkarsh Raj | Roll No: 2330416"
        android:textColor="#AAAAAA"
        android:textSize="14sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"

## MainActivity.kt

<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#121212"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sleep Tracker"
        android:textSize="26sp"
        android:textStyle="bold"
        android:textColor="#FFFFFF"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="40dp"/>

    <Chronometer
        android:id="@+id/chronometer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="36sp"
        android:textColor="#00E5FF"
        app:layout_constraintTop_toBottomOf="@id/title"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="30dp"/>

    <TextView
        android:id="@+id/sleepStage"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sleep Stage: Awake"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        app:layout_constraintTop_toBottomOf="@id/chronometer"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="20dp"/>

    <Button
        android:id="@+id/startBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Start"
        app:layout_constraintTop_toBottomOf="@id/sleepStage"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginStart="40dp"
        android:layout_marginEnd="40dp"
        android:layout_marginTop="30dp"/>

    <Button
        android:id="@+id/stopBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Stop"
        app:layout_constraintTop_toBottomOf="@id/startBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <Button
        android:id="@+id/resetBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Reset"
        app:layout_constraintTop_toBottomOf="@id/stopBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <Button
        android:id="@+id/settingsBtn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Set Goal"
        app:layout_constraintTop_toBottomOf="@id/resetBtn"
        app:layout_constraintStart_toStartOf="@id/startBtn"
        app:layout_constraintEnd_toEndOf="@id/startBtn"
        android:layout_marginTop="10dp"/>

    <TextView
        android:id="@+id/avgSleep"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Average Sleep: 0h"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        app:layout_constraintTop_toBottomOf="@id/settingsBtn"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="25dp"/>

    <TextView
        android:id="@+id/studentInfo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Utkarsh Raj | Roll No: 2330416"
        android:textColor="#AAAAAA"
        android:textSize="14sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginBottom="16dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
        android:layout_marginBottom="16dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>

## Output
<img width="1384" height="839" alt="Screenshot 2026-03-21 201852" src="https://github.com/user-attachments/assets/3923e8ef-c078-45e6-9e7e-ff661e32bc5e" />

