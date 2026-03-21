## activity_main.xml

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="20dp"
    android:gravity="center_horizontal"
    android:background="#FFFFFF">

    <ImageView
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:src="@drawable/download"

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Designed by Utkarsh Raj"
        android:textSize="18sp"
        android:textStyle="bold"
        android:layout_marginBottom="20dp"/>

    <EditText
        android:id="@+id/num1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Num 1"
        android:inputType="number"/>

    <EditText
        android:id="@+id/num2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Num 2"
        android:inputType="number"
        android:layout_marginBottom="15dp"/>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Choose Operation"
        android:textStyle="bold"
        android:layout_marginBottom="10dp"/>

    <!-- Operation Buttons Row -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:gravity="center"
        android:layout_marginBottom="15dp">

        <Button
            android:id="@+id/add"
            android:layout_width="60dp"
            android:layout_height="wrap_content"
            android:text="+"/>

        <Button
            android:id="@+id/sub"
            android:layout_width="60dp"
            android:layout_height="wrap_content"
            android:text="-"
            android:layout_marginStart="10dp"/>

        <Button
            android:id="@+id/mul"
            android:layout_width="60dp"
            android:layout_height="wrap_content"
            android:text="×"
            android:layout_marginStart="10dp"/>

        <Button
            android:id="@+id/div"
            android:layout_width="60dp"
            android:layout_height="wrap_content"
            android:text="÷"
            android:layout_marginStart="10dp"/>

    </LinearLayout>

    <TextView
        android:id="@+id/result"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Result"
        android:textSize="20sp"

  ## MainActivity.kt

    package com.example.calculatorapp;

    import androidx.appcompat.app.AppCompatActivity;
    import android.os.Bundle;
    import android.widget.Button;
    import android.widget.EditText;
    import android.widget.TextView;

    public class MainActivity extends AppCompatActivity {

    EditText num1, num2;
    Button add, sub, mul, div;
    TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        num1 = findViewById(R.id.num1);
        num2 = findViewById(R.id.num2);
        add = findViewById(R.id.add);
        sub = findViewById(R.id.sub);
        mul = findViewById(R.id.mul);
        div = findViewById(R.id.div);
        result = findViewById(R.id.result);

        add.setOnClickListener(v -> calculate('+'));
        sub.setOnClickListener(v -> calculate('-'));
        mul.setOnClickListener(v -> calculate('*'));
        div.setOnClickListener(v -> calculate('/'));
    }

    private void calculate(char operator) {

        String s1 = num1.getText().toString();
        String s2 = num2.getText().toString();

        if (s1.isEmpty() || s2.isEmpty()) {
            result.setText("Result: Enter both numbers");
            return;
        }

        int a = Integer.parseInt(s1);
        int b = Integer.parseInt(s2);
        int res = 0;

        switch (operator) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/':
                if (b == 0) {
                    result.setText("Result: Cannot divide by zero");
                    return;
                }
                res = a / b;
                break;
        }

        result.setText("Result: " + res);
         }
       }

  ## Output
  <img width="534" height="597" alt="Screenshot 2026-03-21 205940" src="https://github.com/user-attachments/assets/86b9e66a-e883-405f-b27a-872560f4cb86" />

        android:textStyle="bold"/>

</LinearLayout>
