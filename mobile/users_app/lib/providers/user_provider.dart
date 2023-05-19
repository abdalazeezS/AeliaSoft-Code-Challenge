import 'package:flutter/foundation.dart';
import 'package:users_app/models/user.dart';
import 'package:users_app/services/user_service.dart';

class UserProvider extends ChangeNotifier {
  final UserService _userService = UserService();
  List<User> _users = [];
  bool _isLoading = false;
  String _error = '';

  UserProvider() {
    fetchUsers();
  }

  List<User> get users => _users;

  bool get isLoading => _isLoading;

  String get error => _error;

  Future<void> fetchUsers() async {
    _isLoading = true;
    notifyListeners();

    try {
      _users = await _userService.fetchUsers();
      _error = '';
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }
}
