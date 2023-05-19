import 'dart:convert';

import 'package:users_app/models/user.dart';
import 'package:http/http.dart' as http;

class UserService {
  final String url = 'https://dummyjson.com/users';

  Future<List<User>> fetchUsers() async {
    final res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
      final List<dynamic> usersData = json.decode(res.body)['users'];
      return usersData.map((e) => User.fromJSON(e)).toList();
    } else {
      throw Exception("Failed to fetch users");
    }
  }

  Future<bool> deleteUser(int id) async {
    try {
      final res = await http.delete(Uri.parse('$url/$id'));
      return res.statusCode == 200;
    } catch (error) {
      print(error);
      return false;
    }
  }
}
