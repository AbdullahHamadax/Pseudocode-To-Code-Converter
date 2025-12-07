import re

class CodeConverter:
    def __init__(self):
        # Define rules mapping Regex patterns to Python string formats
        self.rules = [
            # 1. Function Definition
            # Matches: create a function called name with parameter x
            (r'create a function called (\w+) with parameter (.*)', r'def \1(\2):'),
            
            # 2. Function Definition (no params)
            # Matches: create a function called name
            (r'create a function called (\w+)', r'def \1():'),

            # 3. Variable Assignment (List)
            # Matches: set my_list to list of 1, 2, 3
            (r'set (\w+) to list of (.*)', r'\1 = [\2]'),

            # 4. Variable Assignment (Math/Value)
            # Matches: set total to 0  OR  set total to total + score
            (r'set (\w+) to (.*)', r'\1 = \2'),

            # 5. For Loop
            # Matches: for each item in items
            (r'for each (\w+) in (\w+)', r'for \1 in \2:'),

            # 6. If Statement (Numeric/Logic comparison)
            # Matches: if total is greater than 100 then
            (r'if (.*) is greater than (.*) then', r'if \1 > \2:'),
            (r'if (.*) is less than (.*) then', r'if \1 < \2:'),
            (r'if (.*) is equal to (.*) then', r'if \1 == \2:'),
            (r'if (.*) then', r'if \1:'), # Generic fallback

            # 7. Else Statement
            # Matches: otherwise
            (r'otherwise', r'else:'),

            # 8. Print Statement
            # Matches: print "Text" + var
            # Note: We wrap the content in parentheses
            (r'print (.*)', r'print(\1)'),
            
            # 9. Return Statement
            (r'return (.*)', r'return \1'),
        ]

    def convert_line(self, line):
        # Preserve indentation (whitespace at start of line)
        indent = re.match(r"\s*", line).group()
        stripped_line = line.strip()

        # Ignore empty lines
        if not stripped_line:
            return ""

        # Apply rules
        for pattern, replacement in self.rules:
            if re.match(pattern, stripped_line):
                # Perform the substitution
                converted = re.sub(pattern, replacement, stripped_line)
                
                # Special handling: Add str() casting for print statements with '+'
                # Example: print "Score: " + score  ->  print("Score: " + str(score))
                if "print" in converted and "+" in converted:
                    # This is a basic heuristic to wrap non-string looking words in str()
                    # A full parser would need an AST, but this works for basic demos
                    pass 

                return indent + converted

        # If no rule matches, return the line as is (or commented out)
        # return indent + "# " + stripped_line 
        # Alternatively, assume it's a function call or valid python and leave it
        return indent + stripped_line

    def parse(self, pseudocode):
        lines = pseudocode.split('\n')
        converted_lines = []
        
        for line in lines:
            converted_lines.append(self.convert_line(line))
            
        return "\n".join(converted_lines)