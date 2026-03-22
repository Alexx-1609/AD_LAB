## Assignment.kt

    package com.example.assignmenttracker
    import androidx.room.Dao
    import androidx.room.Database
    import androidx.room.Delete
    import androidx.room.Entity
    import androidx.room.Insert
    import androidx.room.PrimaryKey
    import androidx.room.Query
    import androidx.room.RoomDatabase
    import androidx.room.Update

    @Entity(tableName = "assignments")
    data class Assignment(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val dueDate: Long,
    var isCompleted: Boolean = false
    )
    @Dao
    interface AssignmentDao {
    @Query("SELECT * FROM assignments ORDER BY dueDate ASC")
    fun getAll(): List<Assignment>
    @Insert
    fun insert(assignment: Assignment)
    @Update // <--- If this is red, make sure 'import androidx.room.Update' is at the
    top
    fun update(assignment: Assignment)
    @Delete
    fun delete(assignment: Assignment)

    }

    @Database(entities = [Assignment::class], version = 1)
    abstract class AppDatabase : RoomDatabase() {
    abstract fun assignmentDao(): AssignmentDao
    }


## AssignmentAdapter

    package com.example.assignmenttracker
    import androidx.room.Dao
    import androidx.room.Database
    import androidx.room.Delete
    import androidx.room.Entity
    import androidx.room.Insert
    import androidx.room.PrimaryKey
    import androidx.room.Query
    import androidx.room.RoomDatabase
    import androidx.room.Update

    @Entity(tableName = "assignments")
    data class Assignment(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val dueDate: Long,
    var isCompleted: Boolean = false
    )

    @Dao
    interface AssignmentDao {
    @Query("SELECT * FROM assignments ORDER BY dueDate ASC")

    fun getAll(): List<Assignment>

    @Insert
    fun insert(assignment: Assignment)
    @Update // <--- If this is red, make sure 'import androidx.room.Update' is at the
    top
    fun update(assignment: Assignment)
    @Delete
    fun delete(assignment: Assignment)
    }
    @Database(entities = [Assignment::class], version = 1)
    abstract class AppDatabase : RoomDatabase() {
    abstract fun assignmentDao(): AssignmentDao
    }


## AssingmentGaugeView

    package com.example.assignmenttracker

    import android.app.DatePickerDialog
    import android.app.TimePickerDialog
    import android.os.Bundle
    import android.widget.EditText
    import androidx.appcompat.app.AlertDialog
    import androidx.appcompat.app.AppCompatActivity
    import androidx.recyclerview.widget.LinearLayoutManager
    import androidx.room.Room
    import com.example.assignmenttracker.databinding.ActivityMainBinding
    import java.util.Calendar

    class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var db: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {

    super.onCreate(savedInstanceState)
    binding = ActivityMainBinding.inflate(layoutInflater)
    setContentView(binding.root)
    db = Room.databaseBuilder(applicationContext, AppDatabase::class.java,
    "assignment-db")
    .fallbackToDestructiveMigration()
    .build()
    setupRecyclerView()

    binding.btnAdd.setOnClickListener { showAddDialog() }
    }
    private fun setupRecyclerView() {
    binding.recyclerView.layoutManager = LinearLayoutManager(this)
    updateList()
    }

    fun updateList() {
    Thread {
    val allItems = db.assignmentDao().getAll()
    val currentTime = System.currentTimeMillis()
    val onTime = allItems.count { it.isCompleted && it.dueDate >= currentTime
    }
    val late = allItems.count { it.isCompleted && it.dueDate < currentTime }
    val notDone = allItems.count { !it.isCompleted && it.dueDate < currentTime
    }
    val remaining = allItems.count { !it.isCompleted && it.dueDate >=
    currentTime }

    val sortedList = allItems.sortedBy { it.isCompleted }
    runOnUiThread {
    binding.gaugeView.setData(onTime, late, notDone, remaining)
    binding.recyclerView.adapter = AssignmentAdapter(sortedList, db)
    }
    }.start()
    }

    private fun showAddDialog() {
    val calendar = Calendar.getInstance()
    DatePickerDialog(this, { _, year, month, day ->
    calendar.set(Calendar.YEAR, year)
    calendar.set(Calendar.MONTH, month)
    calendar.set(Calendar.DAY_OF_MONTH, day)
    TimePickerDialog(this, { _, hour, minute ->
    calendar.set(Calendar.HOUR_OF_DAY, hour)
    calendar.set(Calendar.MINUTE, minute)
    calendar.set(Calendar.SECOND, 0)

    val input = EditText(this)
    input.hint = "Assignment Name"
    AlertDialog.Builder(this)
    .setTitle("New Assignment")
    .setMessage("Due: ${calendar.time}")
    .setView(input)
    .setPositiveButton("Add") { _, _ ->
    val name = input.text.toString()
    if (name.isNotEmpty()) {

    val task = Assignment(title = name, dueDate =
    calendar.timeInMillis)
    Thread {
    db.assignmentDao().insert(task)
    runOnUiThread { updateList() }
    }.start()
    }
    }
    .setNegativeButton("Cancel", null)
    .show()

     }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE),
     false).show()
    }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH),
    calendar.get(Calendar.DAY_OF_MONTH)).show()
    }
    }


## MainActivity

    package com.example.assignmenttracker

    import android.app.DatePickerDialog
    import android.app.TimePickerDialog
    import android.os.Bundle
    import android.widget.EditText
    import androidx.appcompat.app.AlertDialog
    import androidx.appcompat.app.AppCompatActivity
    import androidx.recyclerview.widget.LinearLayoutManager
    import androidx.room.Room
    import com.example.assignmenttracker.databinding.ActivityMainBinding
    import java.util.Calendar

    class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var db: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {

    super.onCreate(savedInstanceState)
    binding = ActivityMainBinding.inflate(layoutInflater)
    setContentView(binding.root)
    db = Room.databaseBuilder(applicationContext, AppDatabase::class.java,
    "assignment-db")
    .fallbackToDestructiveMigration()
    .build()
    setupRecyclerView()

    binding.btnAdd.setOnClickListener { showAddDialog() }
    }
    private fun setupRecyclerView() {
    binding.recyclerView.layoutManager = LinearLayoutManager(this)
    updateList()
    }

    fun updateList() {
    Thread {
    val allItems = db.assignmentDao().getAll()
    val currentTime = System.currentTimeMillis()
    val onTime = allItems.count { it.isCompleted && it.dueDate >= currentTime
    }
    val late = allItems.count { it.isCompleted && it.dueDate < currentTime }
    val notDone = allItems.count { !it.isCompleted && it.dueDate < currentTime
    }
    val remaining = allItems.count { !it.isCompleted && it.dueDate >=
    currentTime }

    val sortedList = allItems.sortedBy { it.isCompleted }
    runOnUiThread {
    binding.gaugeView.setData(onTime, late, notDone, remaining)
    binding.recyclerView.adapter = AssignmentAdapter(sortedList, db)
    }
    }.start()
    }

    private fun showAddDialog() {
    val calendar = Calendar.getInstance()
    DatePickerDialog(this, { _, year, month, day ->
    calendar.set(Calendar.YEAR, year)
    calendar.set(Calendar.MONTH, month)
    calendar.set(Calendar.DAY_OF_MONTH, day)
    TimePickerDialog(this, { _, hour, minute ->
    calendar.set(Calendar.HOUR_OF_DAY, hour)
    calendar.set(Calendar.MINUTE, minute)
    calendar.set(Calendar.SECOND, 0)

    val input = EditText(this)
    input.hint = "Assignment Name"
    AlertDialog.Builder(this)
    .setTitle("New Assignment")
    .setMessage("Due: ${calendar.time}")
    .setView(input)
    .setPositiveButton("Add") { _, _ ->
    val name = input.text.toString()
    if (name.isNotEmpty()) {

    val task = Assignment(title = name, dueDate =
    calendar.timeInMillis)
    Thread {
    db.assignmentDao().insert(task)
    runOnUiThread { updateList() }
    }.start()
    }
    }
    .setNegativeButton("Cancel", null)
    .show()

    }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE),
    false).show()
    }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH),
    calendar.get(Calendar.DAY_OF_MONTH)).show()
    }
    }


## Output
<img width="312" height="689" alt="Screenshot 2026-03-22 124434" src="https://github.com/user-attachments/assets/68d9e14f-6a6b-4a5d-b7b2-133015f80358" />

