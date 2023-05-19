class User {
  int id, age;
  String name;

  User({
    required this.id,
    required this.name,
    required this.age,
  });

  factory User.fromJSON(Map<String, dynamic> userObject) {
    return User(
        id: userObject['id'],
        name: userObject['firstName'],
        age: userObject['age'],
    );
  }
}
