import 'package:flutter/material.dart';

import '../models/user.dart';

class UserCard extends StatefulWidget {
  const UserCard({
    Key? key,
    required this.user,
  }) : super(key: key);
  final User user;

  static const TextStyle infoValueStyle = TextStyle(
    fontSize: 18,
    color: Colors.black87,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle infoLabelStyle = TextStyle(
    fontWeight: FontWeight.normal,
    fontSize: 12,
    color: Colors.black54,
  );

  @override
  State<UserCard> createState() => _UserCardState();
}

class _UserCardState extends State<UserCard> {
  int numberOfAbsences = 0;

  @override
  Widget build(BuildContext context) {
    return Card(
      shadowColor: Colors.black,
      elevation: 15,
      color: Colors.white,
      // color: const Color(0xFF3775fc),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 8,
          vertical: 8,
        ),
        width: double.infinity,
        height: 160,
        child: SizedBox(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(width: 8),
                  buildInfoColumn(
                    name: widget.user.name,
                    age: widget.user.age,
                    id: widget.user.id,
                  ),
                ],
              ),
              // const SizedBox(width: 16),
              Expanded(child: buildAbsencesColumn(context, widget.user.id)),
            ],
          ),
        ),
      ),
    );
  }

  Column buildAbsencesColumn(BuildContext context, int id) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        IconButton(
          color: Colors.blue,
          onPressed: () {

          },
          icon: const Icon(Icons.delete_forever),
        ),
        IconButton(
          color: Colors.blue,
          onPressed: () {},
          icon: const Icon(Icons.edit),
        ),
      ],
    );
  }

  Widget buildInfoColumn({
    required String name,
    required int id,
    required int age,
  }) {
    return SizedBox(
      width: 120,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RichText(
            text: TextSpan(
              text: 'Name\n',
              style: UserCard.infoLabelStyle,
              children: [
                TextSpan(
                  text: name,
                  style: UserCard.infoValueStyle,
                )
              ],
            ),
          ),
          RichText(
            text: TextSpan(
              text: 'ID\n',
              style: UserCard.infoLabelStyle,
              children: [
                TextSpan(
                  text: id.toString(),
                  style: UserCard.infoValueStyle,
                )
              ],
            ),
          ),
          RichText(
            text: TextSpan(
              text: 'Grade\n',
              style: UserCard.infoLabelStyle,
              children: [
                TextSpan(
                  text: age.toString(),
                  style: UserCard.infoValueStyle,
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
